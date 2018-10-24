const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Movie Schema
const MovieSchema = new Schema({
  movieId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genres: {
    type: String,
    required: true
  },
  imdbId: {
    type: Number,
    required: true
  },
  tmdbId: {
    type: Number,
    required: true
  }
});

module.exports = Movie = mongoose.model("movies", MovieSchema);
