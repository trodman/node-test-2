var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    console.log("We have a new client: " + socket.id);
});

io.on('connection', function (socket) {
    var tweet = {user: "nodesource", text: 'Hello, world!'};

    // to make things interesting, have it send every second
    var interval = setInterval(function () {
        socket.emit('tweet', tweet);
    }, 1000);

    socket.on('disconnect', function () {
        clearInterval(interval);
    });
    socket.on('mouse',
        function(data) {
                // Data comes in as whatever was sent, including objects
            console.log("Received: 'mouse' " + data.x + " " + data.y);      
                // Send it to all other clients
            //broadcast sends to other clients, but not to user [unidirectional]
            //socket.broadcast.emit('mouse', data);
            //emit sends to user and also other clients [bidirectional]
            io.sockets.emit('mouse', data);
        }
    );
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});