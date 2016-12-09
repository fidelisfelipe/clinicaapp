'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $state, $rootScope, Main, UtilService) {

  $log.log('Hello from your Controller: MenuCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();

});
