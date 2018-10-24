const express = require("express");
const router = express.Router();

const Movie = require("../../models/Movie");

// @route   POST api/movies/mvrecom
// @desc    Fetch TmdbId by MovieId
// @access  Public
router.post("/mvrecom", (req, res) => {
  Movie.findOne({ movieId: req.body.movieId })
    .then(movie => {
      if (!movie) {
        console.log("no movie🐷");
      }
      res.json(movie);
    })
    .catch(err =>
      res
        .status(404)
        .json({ nomoviesfound: "This movie id does not exist in database" })
    );
});

// @route   GET api/movies/mvdetails/:movie_id
// @desc    Get movies
// @access  Public
router.get("/mvdetails/:movie_id", (req, res) => {
  const errors = {};
  Movie.findById(req.params.movie_id)
    .then(movie => {
      if (!movie) {
        errors.noMovie = "Error: this movie id does not exist in database";
        res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err =>
      res
        .status(404)
        .json({ nomoviesfound: "This movie id does not exist in database" })
    );
});

// @route   GET api/movies/search/:search_content/:page
// @desc    Get movies when searching
// @access  Public
router.get("/search/:search_content/:page", function(req, res) {
  let searchContent = req.params.search_content.trim();
  // use RegEx to escape parentheses in search content
  let searchContent1 = searchContent.replace(/\(/gi, "\\(");
  let searchContent2 = searchContent1.replace(/\)/gi, "\\)");

  let itemsPerPage = 10;
  let currentPage = req.params.page || 1;
  let numOfResults;

  // find all movies match the search keyword
  Movie.find({ title: { $regex: ".*" + searchContent2 + ".*", $options: "i" } })
    .then(function(movies) {
      if (!movies) {
        errors.movieSearch = "movie not found";
        return res.status(404).json(errors);
      } else {
        numOfResults = Object.keys(movies).length;
        // sort search result and only return items displayed on current page
        Movie.find({
          title: { $regex: ".*" + searchContent2 + ".*", $options: "i" }
        })
          .sort([["imdbId", -1]])
          .skip(itemsPerPage * currentPage - itemsPerPage)
          .limit(itemsPerPage)
          .then(function(movies) {
            res.json({
              movies: movies,
              currentPage: currentPage,
              totalPages: Math.ceil(numOfResults / itemsPerPage)
            });
          });
      }
    })
    .catch(err =>
      res
        .status(404)
        .json({ nomoviesfound: "There are no movies that matched the query" })
    );
});

// @route   POST api/movies/suggest
// @desc    Search suggest router
// @access  Public
router.post("/suggest", (req, res) => {
  const searchContent = req.body.searchContent.trim();
  Movie.find({
    title: { $regex: "^" + searchContent + ".*", $options: "i" }
  })
    .sort({ _id: -1 })
    .limit(10)
    .then(movie => {
      if (!movie) {
        errors.movieSuggest = "There are no movies that matched the query";
        return res.status(404).json(errors);
      }
      res.json(movie);
    })
    .catch(err =>
      res
        .status(404)
        .json({ nomoviesfound: "There are no movies that matched the query" })
    );
});

// @route   GET api/movies/home
// @desc    Get movies to display on homepage
// @access  Public
router.get("/home", (req, res) => {
  Movie.find({ title: { $regex: /(2016)/ } }, { _id: 1, genres: 1, tmdbId: 1 })
    .then(movies => res.json(movies))
    .catch(err => res.status(404).json({ nomoviesfound: "No movies found" }));
});

module.exports = router;
