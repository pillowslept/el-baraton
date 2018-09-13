'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:NotFoundCtrl
 * @description
 * # NotFoundCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('NotFoundCtrl', function ($location) {
    var vm = this;

    vm.message = "La pagina que intentas buscar no existe o no se encuentra disponible.";

    vm.goToHome = goToHome;
    
    function goToHome(){
      $location.path("/");
    }
  });
