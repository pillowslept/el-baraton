'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:SuccessfulPurchaseCtrl
 * @description
 * # SuccessfulPurchaseCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('SuccessfulPurchaseCtrl', function ($location) {
    var vm = this;

    vm.message = "Tu compra ha sido exitosa, tu pedido será enviado en breve.";

    vm.goToHome = goToHome;
    
    function goToHome(){
      $location.path("/");
    }
  });
