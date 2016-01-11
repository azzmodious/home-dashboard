'use strict';
/**
* Asset Service is responsible for assets in deployd
**/


angular.module('myApp.tempSensor', ['ngRoute']).service('tempSensorSrv', function($http){
    
    this.socket = undefined;
    this.message = function(){
        return "max";
    }
    
    this.getDeviceSocket = function(){
        
    }
    
    this.connect = function(onStatus){
         console.info("Trying to connect...");
        this.socket = io.connect("http://localhost:3333");
        
        this.socket.on("connect", function(){
            console.info("connected to Temp sensor!!!");
            
        });
        
        this.socket.on("status", function(data){
            console.info("device status:"+JSON.stringify(data));
            onStatus(data);
            //$scope.mainFlag = data.main;
            //$scope.changeButtonState();
            //$scope.$apply();
        });
    }
    
});