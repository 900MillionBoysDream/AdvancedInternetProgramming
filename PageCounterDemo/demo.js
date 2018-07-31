var express = require('express');
var app = express();

var i = 0;

app.get('/', function (req, res) {
  i++;
  res.send("HAHAHAHA" + i);
});

app.listen(9002, function () {
  console.log('Example app listening on port 9002!');
});
