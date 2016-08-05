assistControllers = assistApp.controller('contentCtrl', ['$scope', '$routeParams', 'Cat', function ($scope, $routeParams, Cat) {

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
        };
        $scope.getBack = function () {
            return '#/' + $routeParams.catId;
        };
    }]);