

var express = require('express')
  , http = require('http')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  ;
var relay = undefined;
var pumpRelay = undefined;
var five = require("johnny-five"),
board = new five.Board();
var mainState = false;

board.on("ready", function() {
    relay = new five.Relay(8);
    pumpRelay = new five.Relay(7);
});
//app.configure(function(){
 // app.use(express.bodyParser());
//});

//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.emit('status', {
    main: mainState
  });
  socket.on('my other event', function (data) {
    console.log(data);
  });
    socket.on('main:flag', function (data) {
    console.log("Main:flag->"+JSON.stringify(data));
    //console.log("Relay status:"+JSON.stringify(relay));
    mainState = !mainState;
    relay.toggle();
    pumpRelay.toggle();
  });

});
server.listen(3000);
console.log("Waiting to connect...");

console.log("\nWaiting for device to connect...");