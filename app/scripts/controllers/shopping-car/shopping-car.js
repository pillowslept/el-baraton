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
  .controller('ShoppingCarCtrl', function ($location, $rootScope, ProductService, StorageService, Notification) {
    var vm = this;

    //Functions
    vm.deleteFromShoppingCar = deleteFromShoppingCar;
    vm.updateQuantity = updateQuantity;
    vm.finishShopping = finishShopping;
    vm.discardShopping = discardShopping;

    //Shopping Car
    vm.myShoppingCar = [];
    vm.totalPrice = 0;

    function updateQuantity(product){
      if(!product.quantityToAdd || !product.initialQuantity || isNaN(product.quantityToAdd)){
        Notification.warning("Debe ingresar una cantidad válida para el producto");
        return;
      }
      if(product.quantityToAdd > product.initialQuantity){
        Notification.warning("Las cantidades de los productos no deben exceder las existencias");
        return;
      }
      if(product.quantityToAdd <= 0){
       Notification.warning("Las cantidades de los productos no deben ser negativas");
       return;
     }
      product.quantity = product.initialQuantity - parseInt(product.quantityToAdd);
      product.quantityAdded = product.quantityToAdd;

      StorageService.save(vm.myShoppingCar, PRODUCTS_STOCK);
      vm.totalPrice = ProductService.calculateTotalPriceFromProducts(vm.myShoppingCar);
      Notification.success("El producto ha sido actualizado con éxito");
    }

    function deleteFromShoppingCar(product){
      var index = vm.myShoppingCar.indexOf(product);
      if (index > -1) {
        vm.myShoppingCar.splice(index, 1);
      }
      StorageService.save(vm.myShoppingCar, PRODUCTS_STOCK);
      $rootScope.$broadcast(PRODUCTS_STOCK, vm.myShoppingCar);
      vm.totalPrice = ProductService.calculateTotalPriceFromProducts(vm.myShoppingCar);
      Notification.success("El producto ha sido eliminado con éxito");
    }

    function finishShopping(){
      clearShoppingCar();
      $location.path("successful-purchase");
      Notification.success("La compra se ha realizado con éxito");
    }

    function discardShopping(){
      clearShoppingCar();
      $location.path("/");
      Notification.success("Los productos han sido descartados con éxito");
    }

    function clearShoppingCar(){
      vm.myShoppingCar = [];
      StorageService.clear();
      $rootScope.$broadcast(PRODUCTS_STOCK, vm.myShoppingCar);
    }

    function calculateTotalPrice(){
      ProductService.getProductPrice();
    }

    function main(){
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if(!!productsInStock){
        vm.myShoppingCar = productsInStock;
        angular.forEach(vm.myShoppingCar, function(product) {
          product.quantityToAdd = product.quantityAdded;
        });
        vm.totalPrice = ProductService.calculateTotalPriceFromProducts(vm.myShoppingCar);
      }
    }

    main();
  });
