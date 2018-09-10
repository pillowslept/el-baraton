'use strict';

var PRODUCTS_STOCK = 'productsInStock';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:ProductsCtrl
 * @description
 * # ProductsCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('ProductsCtrl', function ($rootScope, StorageService, ProductService, $location) {
    var vm = this;

    //Functions
    vm.minusQuantity = minusQuantity;
    vm.sumQuantity = sumQuantity;
    vm.addToShoppingCar = addToShoppingCar;
    vm.isProductAvailable = isProductAvailable;
    vm.sortBy = sortBy;
    vm.filterByPrice = filterByPrice;

    //Filters
    vm.filterByQuantity = "";
    vm.filterByName = "";

    //Filter by quantity
    vm.quantityInStock = "";
    vm.quantityStock = [];

    //Order
    vm.reverse = false;
    vm.propertyName = "";

    //Products information
    vm.products = [];
    vm.categoryName = "";

    //Shopping Car
    vm.myShoppingCar = [];

    function minusQuantity(product){
      if(product.quantityToAdd <= 0){
        return;
      }
      product.quantityToAdd --;
    }

    function sumQuantity(product){
      if(product.quantityToAdd >= product.quantity){
        return;
      }
      product.quantityToAdd ++;
    }

    function isProductAvailable(product){
      return product.available ? 'Disponible' : 'No disponible';
    }

    function addToShoppingCar(product){
      if(!product.quantityToAdd || !product.quantity || isNaN(product.quantityToAdd)){
        alert("Debe ingresar una cantidad válida para el producto");
        return;
      }
      if(product.quantityToAdd > product.quantity ||
         product.quantityToAdd <= 0){
        alert("Las cantidades no deben exceder la cantidad del producto en stock");
        return;
      }
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if(!!productsInStock){
        var found = false;
        for (var i = 0, len = productsInStock.length; i < len; i++) {
          if(productsInStock[i].id === product.id){
            productsInStock[i].quantityToAdd = product.quantityToAdd;
            productsInStock[i].quantityAdded = parseInt(product.quantityAdded) + parseInt(product.quantityToAdd);
            productsInStock[i].quantity = product.quantity - parseInt(product.quantityToAdd);
            found = true;
            break;
          }
        }
        if(!found){
          productsInStock.push(product);
        }
      }else{
        productsInStock = [];
        productsInStock.push(product);
      }

      product.quantityAdded = product.quantityAdded + parseInt(product.quantityToAdd);
      product.quantity = product.quantity - parseInt(product.quantityToAdd);
      product.quantityToAdd = 0;

      StorageService.save(productsInStock, PRODUCTS_STOCK);
      $rootScope.$broadcast(PRODUCTS_STOCK, productsInStock);
      alert("Producto agregado al carrito");
    }

    function sortBy(propertyName) {
      vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
      vm.propertyName = propertyName;
    }

    function main(){
      var productsByCategory = ProductService.getProducts();

      if(!productsByCategory.category || !productsByCategory.products){
        $location.path("");
        return;
      }

      vm.products = productsByCategory.products;
      vm.categoryName = productsByCategory.parentLevel.name + " " + productsByCategory.category.name;
      
      obtainProductsInShoppingCar();
      calculateFilters();
    }

    function obtainProductsInShoppingCar(){
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if(!!productsInStock){
        vm.myShoppingCar = productsInStock;
      }
    }

    function calculateFilters(){
      vm.listQuantity = [{
        value : "",
        description : "Todos"
      }];
      angular.forEach(vm.products, function(product) {
        product.quantityToAdd = 0;
        product.initialQuantity = product.quantity;

        var productFound = ProductService.findProductById(vm.myShoppingCar, product.id);
        if(!!productFound){
          product.quantityAdded = productFound.quantityAdded;
          product.quantity = productFound.quantity;
        }else{
          product.quantityAdded = 0;
          product.quantity = product.initialQuantity;
        }

        var quantity = {
          value : product.quantity,
          description : product.quantity
        };
        vm.listQuantity.push(quantity);
      });
    }

    function filterByPrice(val){
      return val.price > vm.minPrice && val.price < vm.MaxPrice;
    }

    main();
  });
