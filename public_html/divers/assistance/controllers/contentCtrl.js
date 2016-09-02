assistControllers = assistApp.controller('contentCtrl', ['$location', '$scope', '$routeParams', 'Cat', function ($location, $scope, $routeParams, Cat) {

        console.log("CONTENT CONTROLLER reporting for duty.");
        console.log($routeParams);

        $scope.id = $routeParams.catId;
        $scope.article = $routeParams.articleId;
        $scope.tpl = 'includes/' + $routeParams.catId + '/' + $routeParams.articleId + '.html';

        $scope.cat = Cat.get({catId: $routeParams.catId}, function (cat) {
            $scope.title = cat.links[$routeParams.articleId].name;
            $scope.selectArticle = cat.links[$routeParams.articleId];
        });

        $scope.isActive = function (viewLocation) {
            return viewLocation === $routeParams.catId;
        };
        $scope.updateTemplate = function () {
            $scope.tpl = 'includes/' + $routeParams.catId + '/' + $scope.selectArticle.link + '.html';
            $scope.title = $scope.selectArticle.name;
            $location.path('/categories/'+ $routeParams.catId + '/' + $scope.selectArticle.link, false);
        };
        $scope.getBack = function () {
            return '#/' + $routeParams.catId;
        };
    }]);