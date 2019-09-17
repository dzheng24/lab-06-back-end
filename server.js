'use strict';

const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const weatherArray = [];



//creating /location route
//location
app.get('/location', (request, response) => {
  let searchQuery = request.query.data;
  const geoDataResults = require('./data/geo.json');  

  const locations = new Location(searchQuery, geoDataResults);
  response.send(locations);
  console.log('testArray :', testArray);
})

//[
// {
//     "forecast": "Partly cloudy until afternoon.",
//     "time": "Mon Jan 01 2001"
//   },
//   {
//     "forecast": "Mostly cloudy in the morning.",
//     "time": "Tue Jan 02 2001"
//   },
//   ...
//  ]

app.get('/weather', (request, response) => {
  const darkSkyResults = require('./data/darksky.json');
  let searchQuery = request.query.data;
  let darkSkyData = darkSkyResults.daily.data;

  darkSkyResults.forEach(value => {
    new Weather(darkSkyData);
  })
  response.send(weatherArray);
})

// constructor for Location
function Location(searchQuery, geoDataResults) {
  this.search_query = searchQuery;
  this.formatted_query = geoDataResults.results[0].formatted_address;
  this.latitude = geoDataResults.results[0].geometry.location.lat;
  this.longitude = geoDataResults.results[0].geometry.location.lng;
}

// constructor for weather
function Weather(value) {
  this.forecast = value.forecast;
  this.time = value.time;

  weatherArray.push(this);
}


let formattedWeather = (arr => {
  let timeArray = [];  
  arr.forEach(value => {
    timeArray.push(value.time)
  })
  return timeArray;
})

let formattedSummary = (arr => {
  let summaryArray = [];
  arr.forEach(value => {
    summaryArray.push(value.summary)
  })
  return summaryArray;
})










app.listen(PORT,() => console.log(`listening on ${PORT}`));
