'use strict';
angular.module('main')
.controller('ExameCtrl', function ($log, $state, $stateParams, $rootScope, Main, FlashService, DataService) {

  $log.log('Hello from your Controller: ExameCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.exameId ? Main.getExame($stateParams.exameId, function (result) {
    bind.novo = result;
  }, msgErro) : {};
  var count = 0;
  $rootScope.exameList = [];
  function refreshList() {
    bind.novo = {};
    Main.exames(
      function (result) {
          $rootScope.exameList = result;
      }, msgErroLoadExames);
  };
  refreshList();
  getTipoExameList();
  function getTipoExameList() {
    DataService.getTipoExameList(
      function (tipoExameList) {
          $rootScope.exameAssociadoList = exameAssociadoList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });
  }
  bind.add = function (form) {
    if (form.$valid) {
      if(!bind.novo.tipo){
        FlashService.Error('Tipo de Exame é Obrigatório!');
        return false;
      }
      FlashService.Question('Incluir novo registro?', 
        function () {
          Main.addExame(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });

    } else {
      return false;
    }
  }
  bind.edit = function (form) {
    if (form.$valid) {
      if(!bind.novo.tipo){
        FlashService.Error('Tipo de Exame é Obrigatório!');
        return false;
      }
      FlashService.Question('Alterar dados do registro?', 
        function () {
          Main.editExame(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });
    } else {
      return false;
    }

  }
  bind.remove = function () {
    FlashService.Question('Remover este registro?', 
      function () {
        Main.removeExame(bind.novo.id, function () {refreshList(); msgSucesso();}, msgErro);
      });
  };
  function msgErro() {
    FlashService.Error('Não foi possivel editar o registro...');
  }
  function msgErroLoadExames() {
    FlashService.Error('Não foi possivel acessar os dados!');
  }
  function msgSucesso() {
    FlashService.Success('Operação realizada com sucesso');
    $state.go('main.exameSearch');
  }
  function msgAddSucess() {
    FlashService.Success('Operação realizada com sucesso');
    $state.go('main.exameSearch');
  }

});
