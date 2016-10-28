'use strict';
angular.module('main')
.controller('HomeCtrl', function ($log, UtilService) {

  $log.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();
});
