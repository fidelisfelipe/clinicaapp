'use strict';
angular.module('main')
.controller('ListCtrl', function ($log, Main) {

  $log.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);
  this.someData = Main.someData;
  this.selected = function () {
    alert('ok');
    $log.console('click');
  };
});
