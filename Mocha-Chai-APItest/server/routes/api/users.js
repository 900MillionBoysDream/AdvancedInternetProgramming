const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/keys");
const confirmation = require("../../utils/Confirmation");

const router = express.Router();

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);
  // check if user already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      // create new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      // hash user's password
      let userData = {};
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              res.json(user);
              userData = {
                id: user._id,
                email: user.email
              };
              confirmation(userData);
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route   POST api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "The email or password entered is not correct";
      errors.password = "The email or password entered is not correct";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        // check if user email has been confirmed
        if (user.confirmation === true) {
          const payload = { id: user.id, name: user.name, avatar: user.avatar };
          // Sign Token
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.confirmation = "Please confirm your email";
          return res.status(400).json(errors);
        }
      } else {
        errors.email = "The email or password entered is not correct";
        errors.password = "The email or password entered is not correct";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

//  @route  GET api/users/email/confirmation/:token
//  @desc   Confirm user email
//  @access Private
router.get("/confirmation/:token", (req, res) => {
  jwt.verify(req.params.token, keys.secretOrKey, (err, user) => {
    if (err) return next(err);
    User.findOne({ _id: user.id })
      .then(user => {
        if (user) {
          User.findOneAndUpdate({ _id: user.id }, { confirmation: true }).catch(
            err => console.log("cannot find registed user")
          );

          //////////////////////////////
          /// back up for deployment ///
          //////////////////////////////

          // res.redirect('https://doreamon.herokuapp.com/');
          res.redirect("http://localhost:3000/");
        }
      })
      .catch(err => res.status(400).json("errors"));
  });
});

module.exports = router;
