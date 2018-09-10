'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.service:StorageService
 * @description
 * # StorageService
 * Service of the elBaratonApp
 */
angular.module('elBaratonApp')
  .service('StorageService', function ($window) {
    var vm = this;

    vm.get = function (key){
      var storage = $window.localStorage[key]
      if(!!storage){
        storage = JSON.parse(storage);
      }
      return storage;
    };

    vm.save = function (storage, key){
      $window.localStorage[key] = JSON.stringify(storage);
    };
    
    vm.clear = function (){
      $window.localStorage.clear();
    };
});