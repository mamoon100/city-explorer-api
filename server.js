"use strict";
// @ts-ignore
const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data/weather.json");
const axios = require("axios");
require("dotenv").config();
// @ts-ignore
let port = process.env.PORT;
// @ts-ignore
let weatherKey = process.env.WEATHER_API_KEY;
// @ts-ignore
let movieKey = process.env.MOVIE_API_KEY;

// @ts-ignore
app.use(cors());

class Forecast {
  constructor(date, description, max, min) {
    this.date = date;
    this.description = description;
    this.max = max;
    this.min = min;
  }
}

class Movie {
  constructor(title, date, description, vote, avgVote, src) {
    this.title = title;
    this.date = date;
    this.description = description;
    this.vote = vote;
    this.avgVote = avgVote;
    this.src = `https://image.tmdb.org/t/p/original${src}`;
  }
}

// @ts-ignore
app.get("/weather", (req, res) => {
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
});
// @ts-ignore
app.get("/movie", (req, res) => {
  axios
    // @ts-ignore
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${req.query.city}&include_adult=false`
    )
    .then((response) => {
      let cityMovie = [];
      response.data.results.map((movie) => {
        cityMovie.push(
          new Movie(
            movie.title,
            movie.release_date,
            movie.overview,
            movie.vote_count,
            movie.vote_average,
            movie.poster_path
          )
        );
      });
      console.log(cityMovie);
      res.send(response.data);
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not find Movie You are Looking for try another City");
    });
});
// @ts-ignore
app.get("/", (req, res) => {
  res.send("welcome to my first API");
});

// @ts-ignore
app.listen(port, () => {
  console.log(`You are lessening to port ${port}`);
});
