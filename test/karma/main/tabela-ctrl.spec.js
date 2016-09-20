'use strict';

describe('module: main, controller: TabelaCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var TabelaCtrl;
  beforeEach(inject(function ($controller) {
    TabelaCtrl = $controller('TabelaCtrl');
  }));

  it('should do something', function () {
    expect(!!TabelaCtrl).toBe(true);
  });

});
