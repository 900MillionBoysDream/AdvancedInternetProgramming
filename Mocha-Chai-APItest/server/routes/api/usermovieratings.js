const express = require("express");
const router = express.Router();
const passport = require("passport");

const validateUserMovieRatingInput = require("../../validation/usermovierating");
const UserMovieRating = require("../../models/UserMovieRating");

// @route   GET api/usermovieratings
// @desc    Get current users usermovieratings
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    UserMovieRating.find({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(usermovierating => {
        if (!usermovierating) {
          errors.nousermovierating = "There is no movie rating for this user";
          return res.status(404).json(errors);
        }
        res.json(usermovierating);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/usermovieratings/:mv_id
// @desc    Get a movie rating of current user from usermovieratings
// @access  Private
router.get(
  "/:mv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserMovieRating.findOne({ user: req.user.id, movie: req.params.mv_id })
      .then(usermovierating => {
        if (!usermovierating) {
          errors.nousermovierating = "This movie hasn't rated by this user";
          return res.status(404).json(errors);
        }
        res.json(usermovierating);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/usermovieratings/users/:mv_id
// @desc    Get a particular movie's rating of users
// @access  Public
router.get("/users/:mv_id", (req, res) => {
  const errors = {};

  UserMovieRating.find({ movie: req.params.mv_id })
    .populate("user", ["name", "avatar"])
    .then(usermovieratings => {
      if (!usermovieratings) {
        errors.nousermovierating = "There are no ratings for this movie";
        return res.status(404).json(errors);
      }
      res.json(usermovieratings);
    })
    .catch(err =>
      res.status(404).json({ usermovierating: "There are no usermovieratings" })
    );
});

// @route   GET api/usermovieratings/user/:user_id
// @desc    Get movie ratings of a specific user
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  UserMovieRating.find({ user: req.params.user_id })
    .populate("user movie", ["name", "avatar", "title", "genres"])
    .then(usermovierating => {
      if (!usermovierating) {
        errors.nousermovierating = "There is no rating by this user";
        res.status(404).json(errors);
      }
      res.json(usermovierating);
    })
    .catch(err =>
      res
        .status(404)
        .json({ usermovierating: "Find rating by this user error" })
    );
});

// @route   POST api/usermovieratings
// @desc    Create or edit user movie rating
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateUserMovieRatingInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const userMovieRatingFields = {};
    userMovieRatingFields.user = req.user.id;
    userMovieRatingFields.movie = req.body.movieID;
    if (req.body.rating) userMovieRatingFields.rating = req.body.rating;

    UserMovieRating.findOneAndUpdate(
      {
        user: req.user.id,
        movie: req.body.movieID
      },
      { $set: userMovieRatingFields },
      { new: true }
    ).then(usermovierating => {
      if (!usermovierating) {
        new UserMovieRating(userMovieRatingFields)
          .save()
          .then(usermovierating => res.json(usermovierating));
      }
    });
  }
);

// @route   DELETE api/usermovieratings/:mv_id
// @desc    Delete a movie rating from usermovieratings
// @access  Private
router.delete(
  "/:mv_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserMovieRating.findOneAndRemove({
      user: req.user.id,
      movie: req.params.mv_id
    })
      .then(() => {
        res.json({ success: true });
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
