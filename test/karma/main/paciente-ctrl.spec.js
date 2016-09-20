'use strict';

describe('module: main, controller: PacienteCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var PacienteCtrl;
  beforeEach(inject(function ($controller) {
    PacienteCtrl = $controller('PacienteCtrl');
  }));

  it('should do something', function () {
    expect(!!PacienteCtrl).toBe(true);
  });

});
