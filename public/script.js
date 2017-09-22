var app = angular.module('roverApp', []);
app.constant("roverApiPrefix", "api/rover");
app.controller('roverCtrl', ['$scope', '$http', 'roverApiPrefix', function($scope, $http, roverApiPrefix) {
    $scope.dimension = {};
    $scope.initialized = false;

    $scope.init = function(direction) {
      setDefault();
      $http.post(roverApiPrefix + "/init/", {
        x: $scope.x,
        y: $scope.y,
        direction: $scope.direction
      }).then(function(response) {
        $scope.initialized = true;
        setVariables(response.data);
      });
    };

    $scope.move = function(direction) {
      $http.post(roverApiPrefix + "/move/" + direction).then(function(response) {
        setVariables(response.data);
      });
    };

    var setVariables = function(data) {
       Object.keys(data.coordinate).map(function(key) {
         $scope[key] = data.coordinate[key];
       });

       $scope.direction = data.direction.toUpperCase();
    };

    var setDefault = function() {
      $scope.x = 0;
      $scope.y = 0;
      $scope.direction = 'NORTH';
    }

    setDefault();
}]);
