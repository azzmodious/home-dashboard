'use strict';
/**
* Asset Service is responsible for assets in deployd
**/


angular.module('myApp.deviceServices', ['ngRoute']).service('raspberryPiSrv', function($http){
    
    this.socket = undefined;
    this.message = function(){
        return "max";
    }
    
    this.getDeviceSocket = function(){
        
    }
    
    this.connect = function(onStatus){
         console.info("Trying to connect...");
        this.socket = io.connect("http://heaterpi.local:3000");
        
        this.socket.on("connect", function(){
            console.info("connected!!!");
            
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