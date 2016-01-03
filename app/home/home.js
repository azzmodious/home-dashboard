'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'homeCtrl'
  });
}])

.controller('homeCtrl', function($scope) {
   $scope.message = 'Look! I am an about page.';
    $scope.mainFlag = false;

    $scope.mainButtonClass="";
    $scope.onInit = function(){
        console.info("Trying to connect...");
        $scope.socket = io.connect("http://heaterpi.local:3000");
        
        $scope.socket.on("connect", function(){
            console.info("connected!!!");
        });
        $scope.socket.on("news", function(data){
            console.info(data);
        });
        $scope.socket.on("status", function(data){
            console.info("device status:"+JSON.stringify(data));
            $scope.mainFlag = data.main;
            $scope.changeButtonState();
            $scope.$apply();
        });
        
        var temp = 62.1;
        var tempToDeg = 360 * (temp*.10);
        var neg = 360 - tempToDeg;
        //var myNewChart = new Chart(ctx).PolarArea(data);
        var data = [
            {
                value: tempToDeg,
                color:"#3693f8",
                highlight: "#005cb9",
                label: "Red"
            },
            {
                value: neg,
                color: "#FFFFFF",
                highlight: "#FFFFFF",
                label: "Green"
            }
        ];
        
        var ctx = document.getElementById("myChart").getContext("2d");
        //var myDoughnutChart = new Chart(ctx).Doughnut(data);
        var context = ctx;
        context.beginPath();
        var canvas = document.getElementById("myChart");
      //context.moveTo(200, canvas.height / 2);
      //context.lineTo(canvas.width - 200, canvas.height / 2);
      context.lineWidth = 30;
      context.strokeStyle = '#75d835';
      context.lineCap = 'round';
      context.arc(100,  100,75,0,1.75*Math.PI);
      context.stroke();
        
        ctx.font = "50px Arial";
        ctx.fillText("62",75,113);
    }
    $scope.toggleMain = function(){
        $scope.mainFlag = !$scope.mainFlag; 
        $scope.changeButtonState();
        console.info("Furnance:"+$scope.mainFlag);
        $scope.socket.emit("main:flag", {flag: $scope.mainFlag});
    }
    $scope.changeButtonState = function(){
        if($scope.mainFlag)
        {
            $scope.mainButtonClass = "btn-success";    
        }
        else{
            $scope.mainButtonClass = "btn-danger";
        }
    }
});