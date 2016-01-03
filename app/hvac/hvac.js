'use strict';

angular.module('myApp.hvac', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/hvac', {
    templateUrl: 'hvac/hvac.html',
    controller: 'hvacCtrl'
  });
}])

.controller('hvacCtrl', function($scope, $http) {
    $scope.weatherText = "";
    
    $scope.onInit = function(){
        //$scope.getWeather();
    }
    $scope.getWeather = function(){
        var addy = "http://apidev.accuweather.com/currentconditions/v1/19387_PC.json?language=en&apikey=meSocYcloNe";
       $http.get(addy).then(
           function(resp){
            $scope.weatherText = resp.data;
           }, 
           function(resp){
               $scope.weatherText = "No Contact";
           });
   }
});