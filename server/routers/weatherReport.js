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
    let geolocation = "http://open.mapquestapi.com/geocoding/v1/address?key=BrlRnuf0IpXHl1ubie8ZeBY7BLhlu86W&location=" + city;
    var weather_rc="Cloudy";

    request(geolocation, { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }
    
      let lat = JSON.stringify(body.results[0].locations[0].latLng.lat)
      let long = JSON.stringify(body.results[0].locations[0].latLng.lng)
      //console.log("[getWeatherReport]",city ,lat, long)

      let url="https://40e8a128-041e-43ef-8940-dc633dad734f:vbidsyUzG9@twcservice.eu-gb.mybluemix.net/api/weather/v1/geocode/" + lat + "/" + long + "/observations.json?language=en-US";

      request(url, { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }

        var observation=body.observation;
        //var city=observation.obs_name;
        //var forecast=observation.wx_phrase;
        var wc = observation.wx_icon;
        weather_rc = weatherType(observation.wx_icon);

        console.log("[getWeatherReport] Report for ",lat, long, observation.obs_name,observation.wx_phrase,observation.wx_icon); 
        console.log("[getWeatherReport] city is", weather_rc);
        callback(weather_rc);
        //return(weather_rc);
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

  router.get('/', function (req, res, next) {
     var city = req.query.city;
     console.log("city=",city);
     if (city == null) {
        city = "Hursley";
     }
       
     var forecast;

     getWeatherReport(city, function(weather_rc){
         console.log("Forecast for ",city," is ",weather_rc);
         res.json({weather: weather_rc}); 
     }); 
     
    
     
  });

  console.log("/WeatherReport ** Running **")
  app.use("/WeatherReport", router);
}





