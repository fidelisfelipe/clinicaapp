'use strict';
angular.module('main')
  .controller('HomeCtrl', function($log, $state, $rootScope, UtilService, DataService, FlashService) {

    $log.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);
    var bind = this;

    bind.userCurrent = UtilService.getUserCurrentLocal();
    FlashService.Loading(true, 'Carregando dados de pacientes...');
    DataService.getPacienteList(
      function(pacienteList) {
        $rootScope.pacienteList = pacienteList;
      },
      function(erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });

  });
