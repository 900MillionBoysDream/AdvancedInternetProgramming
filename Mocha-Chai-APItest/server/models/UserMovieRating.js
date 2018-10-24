const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema for user's rating
const UserMovieRatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: "movies"
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = UserMovieRating = mongoose.model("usermovierating", UserMovieRatingSchema);
