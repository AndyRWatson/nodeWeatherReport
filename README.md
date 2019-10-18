# nodeWeatherReport

This sample is a node version of the Weather Report application which can drive the 3D printed wind turbine https://github.com/AndyRWatson/turbine3D

[![](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://bluemix.net)

## pre-req setup
### Create IBM Cloud account and register for Weather Company API service
To run the live weather report part of the demo you will need to create an [IBM Cloud](https://www.ibm.com/cloud) account and register for the [IBM Weather Company Data API service](https://cloud.ibm.com/catalog/services/weather-company-data).   This service offer a free tier with limitations of lifetime 10,000 api calls and no more than 10 api calls a minute.   

### Update weatherReport.js router code to include Weather Company API credentials
Once registered for the Weather Company Data API service you will need to include your service credential api key details (found in the IBM Cloud Weather Data dashboard) in the credentials variable at the top of *./server/routers/weatherReport.js*.  

```
let credentials="insert your IBM Cloud Weather Company API key here"
```

### Update weatherReport.js with remote host IP address of raspberry pi connected to the 3D turbine
To allow the application to control the wind turbine speed you will need to ensure that the IP address of the wind turbine is correctly set within *./server/routers/weatherReport.js*.   As the turbine is controlled by an express app the port number will typically have defaulted to *3000* and not need changing

```
var turbineHostname="192.168.0.100";
var turbinePort="3000";
```

## Codewind demo

There are three steps to the codewind demo,  driving against the express application running on [Turbine](https://github.com/AndyRWatson/Turbine)

1. Build and run nodeWeatherReport express application within EclipseCodewind.  Access the application url http://127.0.0.1:port/weatherReport.html and you should see the weather report page which will allow you to enter a city name and return the current weather report.   By default this will always return the value of 'Nice'
  
2. demonstrate itterative development by uncommenting the code block to make a call to a function that performs a weather channel api call (via IBM cloud) based on the entered city name.   The code will automatically rebuild on save,  and when accessing the application the page should now return a real time weather status based on the city name.   By accessing the nodeWeatherReport node application logs you should now also see more detailed weather information from IBM Cloud service

```     
// *********************************************************************************************
// 1. Uncomment following block to perform real weather lookup from IBM Weather Company Data API
// *********************************************************************************************
     //getWeatherReport(city, function(weather_rc){
          res.json({weather: weather_rc}); 
     //}); 
      console.log("Forecast for [",city,"] is ",weather_rc);
  });
```

3. Final Step is to uncomment the call to send a http post to the turbine which will adjust the rotation speed based on the realtime wind speed for the entered city name.

```
        // ***********************************************
        // 2. uncomment to cause wind turbine to rotate
        // ***********************************************
        //setSpeed(wind_speed);
```        
  
  





