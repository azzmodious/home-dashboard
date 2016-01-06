var WeMo = require('wemo');
var express = require('express')
  , http = require('http')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  ;



/*WeMo.Search('Den Light', function(err, device){
    var wemoSwitch = new WeMo(device.ip, device.port);
    wemoSwitch.setBinaryState(1, function(err, result) { // switch on 
	if (err) console.error(err);
	console.log(result); // 1 
	wemoSwitch.getBinaryState(function(err, result) {
		if (err) console.error(err);
		console.log(result); // 1 
	});
});
});*/




var relay = undefined;
var pumpRelay = undefined;
//var five = require("johnny-five"),
//board = new five.Board();
var mainState = false;
var scanData = undefined;
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
        socket.on('main:flag', function (data) {
        console.log("Main:flag->"+JSON.stringify(data));
        //console.log("Relay status:"+JSON.stringify(relay));
        mainState = !mainState;
        //relay.toggle();
        //pumpRelay.toggle();
      });
    
    socket.on('scan', function(data){
        var client = WeMo.Search();
        client.on('found', function(device) {
            scanData = device;
           console.info(scanData);
        });
        socket.emit('deviceList', {value: scanData});
    });
    
    

});
server.listen(3001);
console.log("Waiting to connect...");

console.log("\nWaiting for device to connect...");