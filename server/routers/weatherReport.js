var express = require('express');
const request = require('request');


// *****************************************************
// Return a weather type
//
// Uses the weather icon code to determine weather type
// Don't return all, simply group by main weather types
// ****************************************************

function weatherType(wc){
 console.log("[weatherType] ",wc);
 var weather="Cloudy"
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

      let credentials="563c478c-7b4b-47c5-b383-53023a755c3f:N8nQZKZT3e"
      let url="https://"+ credentials +"@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/" + lat + "/" + long + "/observations.json?language=en-US";
      console.log("url="+url);
      request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var observation=body.observation;
        //var city=observation.obs_name;
        //var forecast=observation.wx_phrase;
        
       // Check weather type and group similar types  
       var wc = 35 
        if (typeof observation !== 'undefined')
        {
            wc=observation.wx_icon;
            weather_rc = weatherType(wc);

        }
        else
        {
            weather_rc="Sunny";
        }

        console.log("[getWeatherReport] Report for ",lat, long, observation.obs_name,observation.wx_phrase,observation.wx_icon); 
        console.log("[getWeatherReport] city is ", weather_rc);
        callback(weather_rc);
        });
      }
   );
//   console.log("[getWeatherReport] city is",weather_rc);
//   return(weather_rc);
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
      
// ***********************
// Uncomment following block 
// ***********************
//     getWeatherReport(city, function(weather_rc){
//         console.log("Forecast for ",city," is ",weather_rc);
         res.json({weather: weather_rc}); 
//     }); 
     
    
     
  });

  console.log("/WeatherReport ** Running **")
  app.use("/WeatherReport", router);
}





