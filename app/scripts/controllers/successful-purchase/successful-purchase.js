'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:SuccessfulPurchaseCtrl
 * @description
 * # SuccessfulPurchaseCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('SuccessfulPurchaseCtrl', function () {
    var vm = this;

    vm.message = "Tu compra ha sido exitosa, tu pedido será enviado en breve.";
  });
