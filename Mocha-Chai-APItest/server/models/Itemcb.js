const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemcbSchema = new Schema({
  movieId: {
    type: Number,
    required: true
  },
  movie1: {
    type: Number
  },
  movie2: {
    type: Number
  },
  movie3: {
    type: Number
  },
  movie4: {
    type: Number
  },
  movie5: {
    type: Number
  },
  movie6: {
    type: Number
  },
  movie7: {
    type: Number
  },
  movie8: {
    type: Number
  },
  movie9: {
    type: Number
  },
  movie10: {
    type: Number
  }
});

module.exports = Itemcb = mongoose.model("itemcb", ItemcbSchema);
