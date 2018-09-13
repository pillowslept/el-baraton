'use strict';

/**
 * @ngdoc function
 * @name elBaratonApp.service:ProductService
 * @description
 * # ProductService
 * Service of the elBaratonApp
 */
angular.module('elBaratonApp')
  .service('ProductService', function () {
    var vm = this;

    var productsByCategory = {};

    vm.setProducts = setProducts;
    vm.getProducts = getProducts;
    vm.findProductById = findProductById;
    vm.getProductPrice = getProductPrice;
    vm.calculateTotalPriceFromProducts = calculateTotalPriceFromProducts;

    function setProducts(categoryAndProducts) {
      productsByCategory = categoryAndProducts;
    }

    function getProducts() {
      return productsByCategory;
    }

    function findProductById(products, id) {
      var product = undefined;
      for (var i = 0, len = products.length; i < len; i++) {
        if (products[i].id === id) {
          product = products[i];
          break;
        }
      }
      return product;
    }

    function getProductPrice(product){
      var price = product.price.replace("$", "");
      price = price.replace(",", "");
      price = parseFloat(price);
      return price;
    }

    function calculateTotalPriceFromProducts(products){
      var totalPrice = 0;
      for (var i = 0, len = products.length; i < len; i++) {
        totalPrice = totalPrice + (getProductPrice(products[i]) * products[i].quantityAdded);
      }
      return totalPrice;
    }
  });