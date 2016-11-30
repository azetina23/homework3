var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
  console.log("Hello World fom controller");

  var refresh = function() {
      $http.get('/resume').success(function(response) {
        console.log("Got Data: ");
        $scope.resume = response;
      });
  };
  refresh();

  $scope.addInfo = function() {
    $http.post('/resume', $scope.info).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.deselect = function() {
    $scope.contact = "";
  };

}]);
