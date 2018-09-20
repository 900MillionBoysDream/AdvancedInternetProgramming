var express = require('express');
var io = require('socket.io')();

var app = express();

app.set('port', process.env.PORT || 8080);


var server = app.listen(app.get('port'), function () {
    console.log('Listening on port ' + app.get('port'));
});

io.attach(server);
io.on('connection', function (socket) {
    socket.on('SEND_MESSAGE', function (data) {
        io.emit('RECEIVE_MESSAGE', data);
    });
});

