const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const io = require("socket.io")();

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const movies = require("./routes/api/movies");
const chats = require("./routes/api/chats");
const usermovieratings = require("./routes/api/usermovieratings");
const recom = require("./routes/api/recom");

const app = express();

// Body parser config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mongoDB config
const db = require("./config/keys").mongoURI;
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log("MongoDB error: connection failed"));

// Passport config
app.use(passport.initialize());
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/movies", movies);
app.use("/api/chats", chats);
app.use("/api/usermovieratings", usermovieratings);
app.use("/api/recom", recom);

// set server static assets for production version
if (process.env.NODE_ENV === "production") {
  // set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    //path.resolve(): resolves a sequence of paths or path segments into an absolute path
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// server settings
const port = process.env.PORT || 5000;

var server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

// socket.io config
io.attach(server);
io.on("connection", function(socket) {
  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});

module.exports = server;
