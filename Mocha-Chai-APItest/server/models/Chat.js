const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create chat schema
const ChatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
