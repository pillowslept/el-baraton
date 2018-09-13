'use strict';

/**
 * @ngdoc overview
 * @name elBaratonApp
 * @description
 * # elBaratonApp
 *
 * Main module of the application.
 */
angular
  .module('elBaratonApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui-notification',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, NotificationProvider) {
    NotificationProvider.setOptions({
      delay: 5000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'top'
  });

    $routeProvider
      .when('/', {
        templateUrl: 'scripts/controllers/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        controllerAs: "vm"
      })
      .when('/products', {
        templateUrl: 'scripts/controllers/products/products.html',
        controller: 'ProductsCtrl',
        controllerAs: "vm"
      })
      .when('/shopping-car', {
        templateUrl: 'scripts/controllers/shopping-car/shopping-car.html',
        controller: 'ShoppingCarCtrl',
        controllerAs: "vm"
      })
      .when('/successful-purchase', {
        templateUrl: 'scripts/controllers/successful-purchase/successful-purchase.html',
        controller: 'SuccessfulPurchaseCtrl',
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
