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
    'ui-notification'
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
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/products', {
        templateUrl: 'scripts/products/products.html',
        controller: 'ProductsCtrl',
        controllerAs: "vm"
      })
      .when('/shopping-car', {
        templateUrl: 'scripts/shopping-car/shopping-car.html',
        controller: 'ShoppingCarCtrl',
        controllerAs: "vm"
      })
      .when('/successful-purchase', {
        templateUrl: 'scripts/successful-purchase/successful-purchase.html',
        controller: 'SuccessfulPurchaseCtrl',
        controllerAs: "vm"
      })
      .otherwise({
        redirectTo: '/'
      });
  });
