'use strict';

describe('module: main, controller: ConfigCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ConfigCtrl;
  beforeEach(inject(function ($controller) {
    ConfigCtrl = $controller('ConfigCtrl');
  }));

  it('should do something', function () {
    expect(!!ConfigCtrl).toBe(true);
  });

});
