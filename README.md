# nodeWeatherreport

This sample is a node version of the Weather Report application which can drive the 3D printed wind turbine https://github.com/AndyRWatson/3DWindTurbine

[![](https://img.shields.io/badge/IBM%20Cloud-powered-blue.svg)](https://bluemix.net)

## pre-req setup
### Create IBM Cloud account and register for Weather Company API service
To run the live weather report part of the demo you will need to create an IBM Cloud account and register for the IBM Weather Company Data API service.   This service offer a free tier with limitations of lifetime 10,000 api calls and no more than 10 api calls a minute.   

### Update weatherReport.js router code to include Weather Company API credentials
Once registered for the service you will need to include your service api key details in the credentials variable of *./server/routers/weatherReport.js*

```
let credentials="insert your IBM Cloud Weather Company API key here"
```

### Update weatherReport.js with IBM address of turbine
To allow the application to control the wind turbine speed you will need to ensure that the IP address of the wind turbine is correctly set within *./server/routers/weatherReport.js*

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


# weatherreport
