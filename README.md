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

### Update weatherReport.js with remote host IP address of turbine
To allow the application to control the wind turbine speed you will need to ensure that the IP address of the wind turbine is correctly set within *./server/routers/weatherReport.js*.   As the turbine is controlled by an express app the port number will typically have defaulted to *3000* and not need changing

```
var turbineHostname="192.168.0.100";
var turbinePort="3000";
```

## Run locally as Node.js application

```bash
npm install
npm test
npm start
```



