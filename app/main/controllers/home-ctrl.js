'use strict';
angular.module('main')
.controller('HomeCtrl', function ($log, $rootScope, UtilService, DataService, FlashService) {

  $log.log('Hello from your Controller: HomeCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();
  FlashService.Loading('Carregando dados de pacientes...', true);
  DataService.getPacienteList(
      function (pacienteList) {
          $rootScope.pacienteList = pacienteList;
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });

});
