var app = angular.module('roverApp', []);
app.controller('roverCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.x = 0;
    $scope.y = 0;
    $scope.direction = 'NORTH';
    $scope.dimension = {};
    $scope.initialized = false;

    $scope.init = function(direction) {
      $http.post("/init/", {
        x: $scope.x,
        y: $scope.y,
        direction: $scope.direction
      }).then(function(response) {
        $scope.initialized = true;
        setVariables(response.data);
      });
    };

    $scope.move = function(direction) {
      $http.post("/move/" + direction).then(function(response) {
        setVariables(response.data);
      });
    };

    var setVariables = function(data) {
       Object.keys(data).map(function(key) {
         $scope[key] = data[key];
       });
    };
}]);
