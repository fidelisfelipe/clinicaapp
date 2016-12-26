'use strict';
angular.module('main')
.controller('MenuCtrl', function ($log, $state, $rootScope, Main, UtilService) {
  $log.log('Menu.controller');

  var bind = this;
  init();

  function init(){
    $log.log('Menu.init');
  }

});
