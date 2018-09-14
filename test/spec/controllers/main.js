'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('elBaratonApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('Debería validar el mensaje a mostrar en el controlador', function () {
    expect(MainCtrl.message).toBe('Gracias por elegirnos');
  });
});
