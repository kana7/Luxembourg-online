/* Services */

var catServices = angular.module('catServices', ['ngResource']);

catServices.factory('Cat', ['$resource',
  function($resource){
    return $resource('cat/:catId.json', {}, {
      query: {method:'GET', params:{catId:'cat'}, isArray:true}
    });
  }]);
