var app = angular.module('assistanceRoute', [
    'ngRoute'
]);

app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
                // Home
                .when("/", {templateUrl: "views/home.html", controller: "PageCtrl"})
               
                // else 404
                .otherwise("/", {templateUrl: "views/home.html", controller: "PageCtrl"});
    }]);

app.controller('PageCtrl', function ($scope, $location) {
    console.log("Blog Controller reporting for duty.");
});