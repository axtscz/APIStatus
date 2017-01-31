var URL = "http://intrakit.io/api/library";
var app = angular.module("APIStatus", []);

app.controller("APIStatus", function($scope, $interval) {
    $scope.tries = 0;
    $scope.fails = 0;
    $scope.test = function() {
        var start = performance.now();
        fetch(URL)
            .then(function(response) {
                $scope.libraryStatus = response.status;
                $scope.response = response;
                if ($scope.response.status != 200) {
                    $scope.fails++;
                }
                console.log(response);
                $scope.$applyAsync();
            })
            .then(function(json) {
                console.log(performance.now() - start);
                $scope.timeTake = performance.now() - start;
                $scope.lastUpdate = new Date();
                $scope.tries++;
            });
    };
    $scope.test();
    $interval($scope.test, 30000);
});
