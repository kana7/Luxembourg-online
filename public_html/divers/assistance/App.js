var assistApp = angular.module('assistApp', [
    'ngRoute', 
    'assistControllers',
    'catServices'
]);

//ROUTE CONFIGURATION
assistApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
                // Home
                .when("/categories/", {
                    templateUrl: "views/home.html",
                    controller: "MainController"
                })
                .when('/categories/:catId', {
                    templateUrl: "views/list.html",
                    controller: "CatLinksCtrl"
                })
                .when('/categories/:catId/:articleId', {
                    templateUrl: "views/content.html",
                    controller: "contentCtrl"
                })
                // else 404
                .otherwise({
                    redirectTo: '/categories/'
                });
    }]);
/*app.controller('CatLinksCtrl', ['$scope', '$routeParams', 'Cat', function ($scope, $routeParams, Cat) {
 console.log("CAT LINKS CONTROLLER reporting for duty.");
 $scope.cat = Cat.get({catId: $routeParams.catId}, function (cat) {
 $scope.links = cat.links;
 });
 }]);
 app.controller('contentCtrl', ['$scope', '$routeParams', 'Article', function ($scope, $routeParams, Article) {
 console.log("CONTENT reporting for duty.");
 $scope.article = Article.get({articleId: $routeParams.articleId}, function (article) {
 //GET DATA ARTICLE
 });
 }]);*/