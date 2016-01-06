'use strict';

angular.module('myApp.hvac', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'hvac/hvac.html',
    controller: 'hvacCtrl'
  });
}])

.controller('hvacCtrl', function($scope, $http, raspberryPiSrv) {
    $scope.outsideTemp = "";
    $scope.weatherIcon = "";
    $scope.events = [];
    $scope.states = {
        connected:  "btn-primary",
        on: "btn-success", 
        off: "btn-danger", 
        disconnected: "btn-secondary active" 
    };
    
    $scope.heater1 = new Actuator('Den Heater', 'off');
    $scope.mainHeat = {
        state: 'on', //connected, on, off, disconnected 
        toggle: function(){
            if($scope.mainHeat.state == 'on'){
                $scope.mainHeat.state = 'off';
            }
            if($scope.mainHeat.state =='off'){
                $scope.mainHeat.state = 'on'
            }
            
        }
    };
    
    $scope.devices = {};
   
    
    $scope.onInit = function(){
        $scope.getWeather();
        raspberryPiSrv.connect(function(data){
            if(data.main){
                $scope.mainHeat.state = 'on';    
            }
            else{
                $scope.mainHeat.state = 'off';
            }
            $scope.$apply();
        });
    }
    $scope.onMainHeatClick = function(){
        console.info("mainHeat btn clicked");
        console.info(raspberryPiSrv.message);
        //$scope.mainHeat.state = 'connected';
        switch($scope.mainHeat.state){
            case 'on':{
                $scope.mainHeat.state = 'off';
                var e = {
                    type: 'manual-on',
                    title: 'Max turned on the heat',
                    message: 'Max turned on the main furnace. The current inside temp is 63 degrees & outside temp is '+
                    $scope.outsideTemp, 
                    data: $scope.getSensorData()
                }
                
                $scope.events.push(e);
                raspberryPiSrv.socket.emit("main:flag", {flag: false});
                //send message to turn on the heater
            }break;
            case 'off': {
                $scope.mainHeat.state = 'on';
                var e = {
                    type: 'manual-off',
                    title: 'Max turned off the heat',
                    message: 'Max turned on the main furnace. The current inside temp is 72 degrees & outside temp is '+$scope.outsideTemp, 
                    data: $scope.getSensorData()
                }
                raspberryPiSrv.socket.emit("main:flag", {flag: true});
                $scope.events.push(e);
            }break;
        }
        
       
    }
    $scope.getSensorData = function(){
        return {
            officeTemp: $scope.officeTemp,
            basementTemp: $scope.basementTemp,
            outsideTemp: $scope.outsideTemp,
            date: new Date()
        }
    }
    $scope.getWeather = function(){
        var addy = "http://apidev.accuweather.com/currentconditions/v1/19387_PC.json?language=en&apikey=meSocYcloNe";
       $http.get(addy).then(
           function(resp){
            $scope.outsideTemp = resp.data[0].Temperature.Imperial.Value;
            $scope.weatherIcon = resp.data[0].WeatherIcon;
            if($scope.weatherIcon.length == 1)
            {
                    $scope.weatherIcon = '0'+$scope.weatherIcon;
            }
            console.log(resp.data[0]);
           }, 
           function(resp){
               $scope.outsideTemp = "No Contact";
           });
   }
    
    

});