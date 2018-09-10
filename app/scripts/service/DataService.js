'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.service:DataService
 * @description
 * # DataService
 * Service of the elBaratonApp
 */
angular.module('elBaratonApp')
  .service('DataService', function ($http, $q) {
    var vm = this;

    vm.loadFromJson = loadFromJson;

    function loadFromJson(url) {
      var promise = $q.defer();
      $http.get(url).then(function (response) {
        promise.resolve(response);
      }, function (error) {
        promise.reject(error);
      });
      return promise.promise;
    }

  });