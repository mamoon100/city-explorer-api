"use strict";
// @ts-ignore
const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data/weather.json");
require("dotenv").config();
// @ts-ignore
let port = process.env.PORT;

// @ts-ignore
app.use(cors());

class Forecast {
  constructor(date, description, min, max) {
    this.date = date;
    this.description = description;
    this.min = min;
    this.max = max;
  }
}

// @ts-ignore
app.get("/weather", (req, res) => {
  let city = {};
  city = data.find(
    (item) =>
      item.city_name == req.query.searchQuery &&
      item.lat == req.query.lat &&
      item.lon == req.query.lon
  );
  if (city) {
    let cityData = [];
    city.data.map((city) => {
      cityData.push(
        new Forecast(
          city.datetime,
          city.weather.description,
          city.app_min_temp,
          city.app_max_temp
        )
      );
    });
    res.send(cityData);
  } else {
    res.status(500).send("Could not find the city you searched for");
  }
});

// @ts-ignore
app.listen(port, () => {
  console.log(`You are lessening to port ${port}`);
});
