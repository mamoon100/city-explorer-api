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

module.exports = Movie;
