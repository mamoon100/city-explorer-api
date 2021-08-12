// @ts-nocheck
const axios = require("axios");
const Forecast = require("../models/weather.model");
const Cache = require("../helpers/Caching.helper");
let weatherCache = new Cache([]);
let weatherKey = process.env.WEATHER_API_KEY;

const weather = (req, res) => {
  let key = req.query.lat + req.query.lon;
  let cityData = [];
  console.log(weatherCache.data);
  const handleElse = () => {
    axios
      // @ts-ignore
      .get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${weatherKey}`
      )
      .then((response) => {
        response.data.data.map((city) => {
          cityData.push(
            new Forecast(
              city.datetime,
              city.weather.description,
              city.app_max_temp,
              city.app_min_temp
            )
          );
        });

        weatherCache.data[key] = { data: cityData, time: Date.now() };

        res.send(weatherCache.data[key]);
      })
      .catch((err) => {
        res.status(500).send("Could not find city you are looking for");
      });
  };
  if (weatherCache.data[key]) {
    // this if statement to see if the weather data has passed half a day
    if (Date.now() - weatherCache.data[key].time < 43200000) {
      cityData = weatherCache.data[key];
      res.send(cityData);
    } else {
      handleElse();
    }
  } else {
    handleElse();
  }
};

module.exports = weather;
