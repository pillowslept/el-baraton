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
  .controller('ProductsCtrl', function ($rootScope, StorageService, ProductService, $location, Notification) {
    var vm = this;

    //Functions
    vm.addToShoppingCar = addToShoppingCar;
    vm.isProductAvailable = isProductAvailable;
    vm.sortBy = sortBy;
    vm.filterByPrice = filterByPrice;
    vm.showActions = showActions;
    vm.showSoldOut = showSoldOut;
    vm.cleanFilters = cleanFilters;
    vm.filterByPrice = filterByPrice;

    //Filters
    vm.filterByQuantity = "";
    vm.filterByName = "";
    vm.maxPrice = "";
    vm.minPrice = "";
    vm.priceFilterUsed = false;

    //Order by property
    vm.reverse = false;
    vm.propertyName = "";

    //Products information
    vm.products = [];
    var initialProducts = [];

    //Products category name
    vm.categoryName = "";

    //Shopping Car
    var myShoppingCar = [];

    function cleanFilters(){
      vm.maxPrice = "";
      vm.minPrice = "";
      if(initialProducts.length > 0){
        vm.products = initialProducts;
      }
      vm.priceFilterUsed = false;
      buildQuantityFilter();
    }

    function isProductAvailable(product) {
      return product.available ? 'Disponible' : 'No disponible';
    }

    function addToShoppingCar(product) {
      if (!product.quantityToAdd || !product.quantity || isNaN(product.quantityToAdd)) {
        Notification.warning("Debe ingresar una cantidad válida para el producto");
        return;
      }
      if (product.quantityToAdd > product.quantity) {
        Notification.warning("Las cantidades de los productos no deben exceder las existencias");
        return;
      }
      if (product.quantityToAdd <= 0) {
        Notification.warning("Las cantidades de los productos no deben negativas");
        return;
      }
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if (!!productsInStock) {
        validateProductsExistenceInStock(productsInStock, product);
      } else {
        productsInStock = [];
        productsInStock.push(product);
      }

      product.quantityAdded = parseInt(product.quantityAdded) + parseInt(product.quantityToAdd);
      product.quantity = product.quantity - parseInt(product.quantityToAdd);
      product.quantityToAdd = 0;
      updateProductInfo(product);

      buildQuantityFilter();

      StorageService.save(productsInStock, PRODUCTS_STOCK);
      $rootScope.$broadcast(PRODUCTS_STOCK, productsInStock);
      Notification.success("El producto ha sido agregado al carro de compras con éxito");
    }

    function updateProductInfo(product){
      var productFound = ProductService.findProductById(initialProducts, product.id);
      if (!!productFound) {
        productFound.quantityAdded = product.quantityAdded;
        productFound.quantity = product.quantity;
        productFound.quantityToAdd = 0;
      } 
    }

    function sortBy(propertyName) {
      vm.reverse = (vm.propertyName === propertyName) ? !vm.reverse : false;
      vm.propertyName = propertyName;
    }

    function validateProductsExistenceInStock(productsInStock, product){
      var found = false;
      for (var i = 0, len = productsInStock.length; i < len; i++) {
        if (productsInStock[i].id === product.id) {
          productsInStock[i].quantityToAdd = product.quantityToAdd;
          productsInStock[i].quantityAdded = parseInt(product.quantityAdded) + parseInt(product.quantityToAdd);
          productsInStock[i].quantity = product.quantity - parseInt(product.quantityToAdd);
          found = true;
          break;
        }
      }
      if (!found) {
        productsInStock.push(product);
      }
    }

    function main() {
      var productsByCategory = ProductService.getProducts();

      if (!productsByCategory.category || !productsByCategory.products) {
        $location.path("");
        return;
      }

      vm.products = productsByCategory.products;
      vm.categoryName = productsByCategory.parentLevel.name + " " + productsByCategory.category.name;

      obtainProductsInShoppingCar();
      mergeWithProductsInStock();
      buildQuantityFilter();
    }

    function obtainProductsInShoppingCar() {
      var productsInStock = StorageService.get(PRODUCTS_STOCK);
      if (!!productsInStock) {
        myShoppingCar = productsInStock;
      }
    }

    function mergeWithProductsInStock() {
      for (var i = 0, len = vm.products.length; i < len; i++) {
        vm.products[i].quantityToAdd = 0;
        vm.products[i].initialQuantity = vm.products[i].quantity;

        var productFound = ProductService.findProductById(myShoppingCar, vm.products[i].id);
        if (!!productFound) {
          vm.products[i].quantityAdded = productFound.quantityAdded;
          vm.products[i].quantity = productFound.quantity;
        } else {
          vm.products[i].quantityAdded = 0;
          vm.products[i].quantity = vm.products[i].initialQuantity;
        }
      }
    }

    function buildQuantityFilter(){
      vm.listQuantity = [{
        value: "",
        description: "Todos"
      }];

      for (var i = 0, len = vm.products.length; i < len; i++) {
        if(vm.products[i].quantity > 0){
          var quantity = {
            value: vm.products[i].quantity,
            description: vm.products[i].quantity
          };
          vm.listQuantity.push(quantity);
        }
      }
    }

    function filterByPrice() {
      if(isNaN(vm.minPrice) || isNaN(vm.maxPrice)){
        Notification.warning("Debe ingresar precios válidos para aplicar los precios");
        return;
      }
      if(vm.minPrice <= 0 || vm.maxPrice <= 0){
        Notification.warning("Los precios no puede menores o iguales a cero");
        return;
      }
      if(vm.minPrice >= vm.maxPrice){
        Notification.warning("El precio mínimo no puede ser mayor o igual al precio máximo");
        return;
      }
      initialProducts = angular.copy(vm.products);
      var filteredProducts = filterProductsByPrice(vm.products);
      vm.products = filteredProducts;
      vm.priceFilterUsed = true;
    }

    function filterProductsByPrice(products){
      return products.filter(function(product) {
        var price = ProductService.getProductPrice(product);
        return price >= vm.minPrice && price <= vm.maxPrice;
      });
    }

    function showActions(product){
      return product.available && product.quantity > 0;
    }

    function showSoldOut(product){
      return product.available && product.quantity == 0;
    }

    main();
  });
