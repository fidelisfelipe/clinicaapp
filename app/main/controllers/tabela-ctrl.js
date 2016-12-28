'use strict';
angular.module('main')
.controller('TabelaCtrl', function ($log, $state, $rootScope, Main, UtilService) {
  $log.log('Tabela.controller');

  var bind = this;
  init();

  function init(){
    $log.log('Tabela.init');
  }

});
