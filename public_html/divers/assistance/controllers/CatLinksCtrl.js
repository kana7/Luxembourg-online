assistControllers = assistApp.controller('CatLinksCtrl', ['$scope', '$routeParams', 'Cat', function ($scope, $routeParams, Cat) {

        console.log("CATLINKS CONTROLLER reporting for duty.");

        $scope.cat = Cat.get({catId: $routeParams.catId}, function (cat) {
            $scope.links = cat.links;
        });
        $scope.isActive = function (viewLocation) {
            return viewLocation === $routeParams.catId;
        };
    }]);