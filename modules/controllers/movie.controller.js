// @ts-nocheck
const axios = require("axios");
const Movie = require("../models/movie.model");
const Cache = require("../helpers/Caching.helper");
let MovieCache = new Cache([]);
let movieKey = process.env.MOVIE_API_KEY;

const movie = (req, res) => {
  let cityMovie = [];
  let city = req.query.city;
  const handleElse = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${movieKey}&query=${city}&include_adult=false`
      )
      .then((response) => {
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
        MovieCache.data[city] = { data: cityMovie, time: Date.now() };
        res.send(MovieCache.data[city]);
      })
      .catch((err) => {
        res
          .status(500)
          .send("Could not find Movie You are Looking for try another City");
      });
  };
  if (MovieCache.data[city]) {
    if (Date.now() - MovieCache.data[city].time < 86400000) {
      cityMovie = MovieCache.data[req.query.city];
      res.send(cityMovie);
    } else {
      handleElse();
    }
  } else {
    handleElse();
  }
};

module.exports = movie;
