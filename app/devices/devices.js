'use strict';

angular.module('myApp.devices', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/devices', {
    templateUrl: 'devices/devices.html',
    controller: 'devicesCtrl'
  });
}])

.controller('devicesCtrl', function($scope, $http, raspberryPiSrv) {
    $scope.message = "Devices";
    $scope.deviceList = [];
    
    $scope.onInit = function(){
        console.info("Trying to connect...");
        $scope.socket = io.connect("http://localhost:3001");
        
        $scope.socket.on("connect", function(){
            console.info("connected!!!");
            $scope.socket.emit('scan', {});
        });
        
        $scope.socket.on("deviceList", function(data){
            console.info("device status:"+JSON.stringify(data));
            //$scope.message = data;
            //var d = JSON.parse(data);
            $scope.deviceList.push(data);
            $scope.$apply();
            //onStatus(data);
            
        });
        /*var client = WeMo.Search();
        client.on('found', function(device) {
            console.log(device);
            setTimeout(function() {
                client.exit();
            }, 3000);
        });*/
        
        /*
        WeMo.Search('Den Light', function(err, device){
            var wemoSwitch = new WeMo(device.ip, device.port);
            wemoSwitch.setBinaryState(0, function(err, result) { // switch on 
            if (err) console.error(err);
            console.log(result); // 1 
            wemoSwitch.getBinaryState(function(err, result) {
                if (err) console.error(err);
                console.log(result); // 1 
            });
        });
        });*/

    }

});