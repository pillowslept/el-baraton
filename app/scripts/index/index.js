'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('IndexCtrl', function ($location) {
    var vm = this;

    vm.changeUrl = changeUrl;
    
    function changeUrl(path){
      console.log("Si");
      $location.path( path );
    }

  });
