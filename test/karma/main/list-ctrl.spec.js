'use strict';

describe('module: main, controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate controller
  var ListCtrl;
  beforeEach(inject(function ($controller) {
    ListCtrl = $controller('ListCtrl');
  }));

  it('should do something', function () {
    expect(!!ListCtrl).toBe(true);
  });

});
