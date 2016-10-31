'use strict';
angular.module('main')
.controller('PacienteCtrl', function ($scope, $log, $state, $stateParams, $rootScope, $ionicModal, Main, FlashService, DataService) {

  $log.log('Hello from your Controller: PacienteCtrl in module main:. This is your controller:', this);
  var bind = this;

  bind.openModalShow = true;
  bind.openModalEdit = false;
  if ($stateParams.pacienteId)
  bind.novo = $stateParams.pacienteId ? DataService.getPaciente($stateParams.pacienteId, 
    function (result) {
      bind.novo = result;
    }, function (msgError) {
      FlashService.Error(msgError);
    }) : {};

  var count = 0;
  $rootScope.pacienteList = [];
  function refreshList() {
    bind.novo = {};
    DataService.getPacienteList(
      function (pacienteList) {
          $rootScope.pacienteList = pacienteList;
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
      });
  };
  function refreshListExames() {
    if ($stateParams.pacienteId)
    DataService.getExamesPaciente($stateParams.pacienteId,
        function (result) {
            bind.exameList = result;
            //lista todos os exames cadastrados
        }, msgErro);
  };
  refreshList();
  refreshListExames();

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
          DataService.editPaciente(bind.novo,
            function () {
                DataService.getPaciente(bind.novo.id, 
                  function (result) {
                    bind.novo = result;
                    FlashService.Success('Registro Atualizado com Sucesso!');
                  }, function (msgError) {
                    FlashService.Error(msgError);
                  });
                refreshList();
            }, function (erroMsg) {
              FlashService.Error(erroMsg);
            });
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
  function msgErroLoadPacientes() {
    FlashService.Error('Não foi possivel acessar os dados!');
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
