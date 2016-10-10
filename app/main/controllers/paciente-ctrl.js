'use strict';
angular.module('main')
.controller('PacienteCtrl', function ($log, $state, $stateParams, $rootScope, Main, FlashService) {

  $log.log('Hello from your Controller: PacienteCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.pacienteId ? Main.getPaciente($stateParams.pacienteId, function (result) {
    bind.novo = result;
  }, msgErro) : {};
  var count = 0;
  $rootScope.pacienteList = [];
  function refreshList() {
    bind.novo = {};
    Main.pacientes(
      function (result) {
          $rootScope.pacienteList = result;
      }, msgErro);
  };
  refreshList();
  bind.add = function (form) {
    if (form.$valid) {
    
    	FlashService.Question('Incluir novo registro?', 
        function () {
          Main.addPaciente(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });

    } else {
      return false;
    }

  }
  bind.edit = function (form) {
    if (form.$valid) {
      FlashService.Question('Alterar dados do registro?', 
        function () {
          Main.editPaciente(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });
    } else {
      return false;
    }

  }
  bind.remove = function () {
    FlashService.Question('Remover este registro?', 
      function () {
        Main.removePaciente(bind.novo.id, function () {refreshList(); msgSucesso();}, msgErro);
      });
  };
  function msgErro() {
    FlashService.Error('Não foi possivel editar o registro...');
  }
  function msgSucesso() {
  	FlashService.Success('Operação realizada com sucesso');
  	$state.go('main.pacienteSearch');
  }
  function msgAddSucess() {
    FlashService.Success('Operação realizada com sucesso');
    $state.go('main.pacienteSearch');
  }

});
