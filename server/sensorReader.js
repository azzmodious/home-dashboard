var express = require('express')
  , http = require('http')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  ;
var SerialPort = require("serialport").SerialPort
var com = require("serialport");

var temp = {};
com.list(function (err, ports) {
  ports.forEach(function(port) {
    console.log(port.comName);
    console.log(port.pnpId);
    console.log(port.manufacturer);
  });
});

var serialPort = new SerialPort("/dev/cu.usbmodem1421", {
                    baudrate: 9600,
                    parser: com.parsers.readline('\r\n')
                });
console.info("Attempting to connect ...");
serialPort.on("open", function(){
    console.log("Connected to device...");
    
    serialPort.on('data', function(data){
        //console.log('data recieved: '+data);
        temp = JSON.parse(data);
        
    });
    
});




//var relay = undefined;
//var pumpRelay = undefined;
//var five = require("johnny-five"),
//board = new five.Board();
var mainState = false;

/*board.on("ready", function() {
    relay = new five.Relay(8);
    pumpRelay = new five.Relay(7);
});*/
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

  socket.on('getTemp', function(data){
      console.info("Get Temp was called");
      socket.emit('temp', temp);
  });
    
    /*
    * Turns on stuff
    */
    socket.on('main:flag', function (data) {
    console.log("Main:flag->"+JSON.stringify(data));
    //console.log("Relay status:"+JSON.stringify(relay));
    mainState = !mainState;
    //relay.toggle();
    //pumpRelay.toggle();
  });

});
server.listen(3333);
console.log("Waiting to connect...");

console.log("\nWaiting for device to connect...");