'use strict';

var PRODUCTS_STOCK = 'productsInStock';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:ShoppingCarCtrl
 * @description
 * # ShoppingCarCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('ShoppingCarCtrl', function ($location, $rootScope, DataService, StorageService, Notification) {
    var vm = this;

    //Functions
    vm.deleteFromShoppingCar = deleteFromShoppingCar;
    vm.updateQuantity = updateQuantity;
    vm.finishShopping = finishShopping;
    vm.discardShopping = discardShopping;

    //Shopping Car
    vm.myShoppingCar = [];

    function updateQuantity(product){
      if(!product.quantityToAdd || !product.initialQuantity || isNaN(product.quantityToAdd)){
        Notification.warning("Debe ingresar una cantidad válida para el producto");
        return;
      }
      if(product.quantityToAdd > product.initialQuantity ||
         product.quantityToAdd <= 0){
        Notification.warning("Las cantidades no deben exceder la cantidad del producto en stock");
        return;
      }
      product.quantity = product.initialQuantity - parseInt(product.quantityToAdd);
      product.quantityAdded = product.quantityToAdd;

      StorageService.save(vm.myShoppingCar, PRODUCTS_STOCK);
      Notification.success("Producto actualizado con éxito");
    }

    function deleteFromShoppingCar(product){
      var index = vm.myShoppingCar.indexOf(product);
      if (index > -1) {
        vm.myShoppingCar.splice(index, 1);
      }
      StorageService.save(vm.myShoppingCar, PRODUCTS_STOCK);
      $rootScope.$broadcast(PRODUCTS_STOCK, vm.myShoppingCar);
      Notification.success("Producto eliminado del carrito");
    }

    function finishShopping(){
      vm.myShoppingCar = [];
      StorageService.clear();
      $rootScope.$broadcast(PRODUCTS_STOCK, vm.myShoppingCar);
      $location.path("successful-purchase");
      Notification.success("La compra se ha realizado con éxito");
    }

    function discardShopping(){
      vm.myShoppingCar = [];
      StorageService.clear();
      $rootScope.$broadcast(PRODUCTS_STOCK, vm.myShoppingCar);
      $location.path("/");
      Notification.success("Los productos se descartaron con éxito");
    }

    function main(){
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if(!!productsInStock){
        vm.myShoppingCar = productsInStock;
        angular.forEach(vm.myShoppingCar, function(product) {
          product.quantityToAdd = product.quantityAdded;
        });
      }
    }

    main();
  });
