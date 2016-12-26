'use strict';
angular.module('main')
  .controller('HomeCtrl', function($log, $state, $rootScope, UtilService, DataService, FlashService) {

    $log.log('Home.controller');
    var bind = this;
    bind.pacienteTotal = 0;
    bind.tipoExameTotal = 0;
    bind.exameTotal = 0;

  });
