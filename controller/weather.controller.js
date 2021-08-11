// @ts-nocheck
const axios = require("axios");
let weatherKey = process.env.WEATHER_API_KEY;
const Forecast = require("../model/weather.model");

const weather = (req, res) => {
  axios
    // @ts-ignore
    .get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${req.query.lat}&lon=${req.query.lon}&key=${weatherKey}`
    )
    .then((response) => {
      let cityData = [];
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
      // console.log(cityData);
      res.send(cityData);
    })
    .catch((err) => {
      res.status(500).send("Could not find city you are looking for");
    });
};

module.exports = weather;
