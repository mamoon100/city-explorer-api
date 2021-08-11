// @ts-nocheck
"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const data = require("./data/weather.json");
const axios = require("axios");
require("dotenv").config();
const movie = require("./controller/movie.controller");
const weather = require("./controller/weather.controller");
let port = process.env.PORT;
app.use(cors());

app.get("/weather", weather);

app.get("/movie", movie);

app.get("/", (req, res) => {
  res.send("welcome to my first API");
});

app.listen(port, () => {
  console.log(`You are lessening to port ${port}`);
});
