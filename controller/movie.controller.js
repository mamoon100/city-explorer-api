// @ts-nocheck
const axios = require("axios");
const Movie = require("../model/movie.model");
let movieKey = process.env.MOVIE_API_KEY;

const movie = (req, res) => {
  axios
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
      // console.log(cityMovie);
      res.send(cityMovie);
    })
    .catch((err) => {
      res
        .status(500)
        .send("Could not find Movie You are Looking for try another City");
    });
};

module.exports = movie;
