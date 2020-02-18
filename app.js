const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO = require('socket.io')(server); //get package and instantiate with server

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

answer = [];

//routes
app.get('/', function(req,res) {
    res.sendFile(__dirname + '/public/index.html');
});
//codemaker
app.get('/codemaker', function(req,res) {
    res.sendFile(__dirname + '/public/codemaker.html');
});

//websocket events
socketIO.on('connection', function(socket){
    console.log(socket.id + " has connected!");

    socket.on('disconnect', function(data){
        console.log(socket.id + " has disconnected!");
    })

    //custom events
    socket.on('submitButton', function(data){
        console.log("checking event heard");
        console.log(data);
        socketIO.sockets.emit('check_answer', data);
    });

    socket.on('red', function(data){
        console.log("red event heard");
        socketIO.sockets.emit('color_change', {r:255, g:0, b:0});
    });

    socket.on('green', function(data){
        console.log("green event heard");
        socketIO.sockets.emit('color_change', {r:0, g:255, b:0});
    });

    socket.on('yellow', function(data){
        console.log("yellow event heard");
        socketIO.sockets.emit('color_change', {r:255, g:255, b:0});
    });

    socket.on('white', function(data){
        console.log("white space event heard");
        socketIO.sockets.emit('color_change', {r:255, g:255, b:255});
    });

});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);