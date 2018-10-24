const express = require("express");
const passport = require("passport");

const Chat = require("../../models/Chat");
const validateChatInput = require("../../validation/chat");

const router = express.Router();

// @route   GET api/chats
// @desc    Get chats
// @access  Public
router.get("/", (req, res) => {
  Chat.find()
    .sort({ date: 1 })
    .then(chats => res.json(chats))
    .catch(err => res.status(404).json({ nochatsfound: "No chats found" }));
});

// @route   GET api/chats/latest
// @desc    Get latest 3 chats
// @access  Public
router.get("/latest", (req, res) => {
  Chat.find()
    .sort({ date: -1 })
    .limit(3)
    .populate("user", ["name", "avatar"])
    .then(chats => res.json(chats))
    .catch(err => res.status(404).json({ nochatsfound: "No chats found" }));
});

// @route   POST api/chats
// @desc    Create chat
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChatInput(req.body);

    // Check Validation
    if (!isValid) return res.status(400).json(errors);
    // Get fields
    const chatFields = {};
    chatFields.user = req.user.id;
    chatFields.text = req.body.text;

    new Chat(chatFields).save().then(chat => res.json(chat));
  }
);

module.exports = router;
