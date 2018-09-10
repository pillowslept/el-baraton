'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.service:ProductService
 * @description
 * # ProductService
 * Service of the elBaratonApp
 */
angular.module('elBaratonApp')
  .service('ProductService', function ($http, $q) {
    var vm = this;

    var productsByCategory = {};
    vm.setProducts = setProducts;
    vm.getProducts = getProducts;
    vm.findProductById = findProductById;

    function setProducts(categoryAndProducts){
      productsByCategory = categoryAndProducts;
    }
    
    function getProducts(){
      return productsByCategory;
    }

    function findProductById(products, id){
      var product = undefined;
      for (var i = 0, len = products.length; i < len; i++) {
        if(products[i].id === id){
          product = products[i];
          break;
        }
      }
      return product;
    }
});