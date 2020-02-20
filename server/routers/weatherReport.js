var express = require('express');
const request = require('request');

// Configurable parts for demo

let credentials="<insert IBM Weather Company Data API key here>"
var turbineHostname="192.168.0.100";
var turbinePort="3000";


// *****************************************************
// Return a weather type
//
// Uses the weather icon code to determine weather type
// Don't return all, simply group by main weather types
// ****************************************************

function weatherType(wc){
 console.log("[weatherType] ",wc);
 var weather="Cloudy";
 if(wc==null)
 {
     weather="Thunder";
 }
 else
 if (wc >=33 && wc <=34)
   weather= "Fair";
 else
 if (wc >=31 && wc <=36 ) {
   weather= "Sunny";
 }
 else
  if  (wc <=4 || wc >=37) {
     weather="Thunder";
 }
 else
  if  (wc >=13 && wc <=18) {
     weather="Snow";
 }
 else
   {weather="Cloudy";
   }
 console.log("[weatherType] ",weather);
 return(weather);
}

function setSpeed(wind_speed)
{
  var turbineSpeed=0;
  var url="";
  
  if (wind_speed > 50) {
    turbineSpeed=100;
  }
  else
  if (wind_speed == 0)
  {
    turbineSpeed=0;
  }
  else
  {
    turbineSpeed=50+wind_speed;
  }

  
  url="http://"+turbineHostname+":"+turbinePort+"/setTurbineSpeed?speed="+turbineSpeed;

  request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); } });
  
  console.log("[POST]"+url);
  
  return 0;
}

// ***************************************
// Get Weather Report  for a given city name
// ***************************************
function getWeatherReport(city, callback) {


    // ********************************************************************
    // First convert city name to long/lat for use by Weather Company apis 
    // ********************************************************************
 
    
    let geolocation = "http://open.mapquestapi.com/geocoding/v1/address?key=BrlRnuf0IpXHl1ubie8ZeBY7BLhlu86W&location=" + city;
    var weather_rc="Cloudy";
  

    request(geolocation, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
    
      let lat = JSON.stringify(body.results[0].locations[0].latLng.lat)
      let long = JSON.stringify(body.results[0].locations[0].latLng.lng)
      //console.log("[getWeatherReport]",city ,lat, long)

      // *********************************************************
      // Peform city lookup using Weather Company api (IBM Cloud)
      // *********************************************************

      
      let url="https://"+ credentials +"@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/" + lat + "/" + long + "/observations.json?language=en-US";
      console.log("url="+url);
      request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var observation=body.observation;
       
       // Check weather type and group similar types  
       var wc = 35 
       var wind_speed=1;
       var wind_direction="N";
        if (typeof observation !== 'undefined')
        {
            wc=observation.wx_icon;
            wind_speed=observation.wspd;
            wind_direction=observation.wdir_cardinal;
            console.log("[wind speed] :",wind_speed);
            console.log("[wind direction] :",wind_direction);
            weather_rc = weatherType(wc);

        }
        else
        {
            weather_rc="Sunny";
        }
 
        // ***********************************************
        // 2. uncomment to cause wind turbine to rotate
        // ***********************************************
        // setSpeed(wind_speed);
        
      
        console.log("[getWeatherReport] city is ", weather_rc);
        callback(weather_rc);
        });
      }
   );
}

// ***************
// Routes
// ***************

module.exports = function(app) {
  var router = express.Router();
  var weather_rc = "Nice";

  router.get('/', function (req, res, next) {
     var city = req.query.city;
     console.log("city=",city);
     if (city == null) {
        city = "Hursley";
     }
      
// *********************************************************************************************
// 1. Uncomment following block to perform real weather lookup from IBM Weather Company Data API
// *********************************************************************************************
    // getWeatherReport(city, function(weather_rc){
          res.json({weather: weather_rc}); 
    //  }); 
      console.log("Forecast for [",city,"] is ",weather_rc);
  });

  console.log("/WeatherReport ** Running **")
  app.use("/WeatherReport", router);
}





