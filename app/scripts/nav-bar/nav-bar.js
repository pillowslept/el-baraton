'use strict';

var CATEGORIES_JSON = 'scripts/resource/categories.json';
var PRODUCTS_JSON = 'scripts/resource/products.json';
var PRODUCTS_STOCK = 'productsInStock';

/**
 * @ngdoc function
 * @name elBaratonApp.controller:NavBarCtrl
 * @description
 * # NavBarCtrl
 * Controller of the elBaratonApp
 */
angular.module('elBaratonApp')
  .controller('NavBarCtrl', function ($location, $route, $scope, DataService, StorageService, ProductService) {
    var vm = this;

    vm.changeUrl = changeUrl;
    vm.natigateToProducts = natigateToProducts;
    vm.totalProducts = 0;
    vm.itemsMenu = [];
    
    var allProducts = [];
    
    function changeUrl(path){
      $location.path( path );
      $route.reload();
    }

    $scope.$on(PRODUCTS_STOCK, function(event, params) {
      validateProductsInStock(params);
    });

    function main(){
      DataService.loadFromJson(CATEGORIES_JSON).then(function(response) {
        vm.itemsMenu = response.data.categories;
      });
      DataService.loadFromJson(PRODUCTS_JSON).then(function(response) {
        allProducts = response.data.products;
      });

      validateProductsInStock(StorageService.get(PRODUCTS_STOCK));
    }

    function validateProductsInStock(productsInStock){
      if(!!productsInStock){
        vm.totalProducts = productsInStock.length;
      }
    }

    function natigateToProducts(parentLevel, category){
      var productsByCategory = allProducts.filter(function(product) {
        return product.sublevel_id === category.id;
      });

      var productsByCategory = {
        "category" : category,
        "products" : angular.copy(productsByCategory),
        "parentLevel" : parentLevel
      };

      ProductService.setProducts(productsByCategory);
      changeUrl("products");
    }

    main();
  });
