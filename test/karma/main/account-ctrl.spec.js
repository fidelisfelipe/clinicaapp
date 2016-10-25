'use strict';

describe('module: main, controller: AccountCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var AccountCtrl;
  beforeEach(inject(function ($controller) {
    AccountCtrl = $controller('AccountCtrl');
  }));

  it('should do something', function () {
    expect(!!AccountCtrl).toBe(true);
  });

});
