'use strict';
angular.module('main')
.controller('TipoExameCtrl', function ($log, $state, $stateParams, $rootScope, Main, FlashService, DataService) {

  $log.log('Hello from your Controller: TipoExameCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.tipoExameId ? Main.getTipoExame($stateParams.tipoExameId, function (result) {
    bind.novo = result;
  }, msgErro) : {};
  var count = 0;
  $rootScope.tipoExameList = [];
  function refreshList() {
    bind.novo = {};
    FlashService.Loading(true, 'Carregando lista de tipo exame');
    DataService.getTipoExameList(function(tipoExameList){
      $rootScope.tipoExameList = tipoExameList;
      FlashService.Loading(false);
    }, function(msgErro){
      FlashService.Error(msgErro);
      FlashService.Loading(false);
    });
  };
  function getExameAssociadoList() {
    if($stateParams.tipoExameId){
      FlashService.Loading(true, 'Carregando lista de tipo exame');
      DataService.getExameAssociadoList($stateParams.tipoExameId, function(exameAssociadoList){
        $rootScope.exameAssociadoList = exameAssociadoList;
        FlashService.Loading(false);
      }, function(msgErro){
        FlashService.Error(msgErro);
        FlashService.Loading(false);
      });
    }

  };
  refreshList();
  getExameAssociadoList();

  bind.add = function (form) {
    if (form.$valid) {

      FlashService.Question('Incluir novo registro?',
        function () {
          Main.addTipoExame(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });

    } else {
      return false;
    }
  }
  bind.edit = function (form) {
    if (form.$valid) {
      FlashService.Question('Alterar dados do registro?',
        function () {
          Main.editTipoExame(bind.novo, function () {refreshList(); msgSucesso();}, msgErro);
        });
    } else {
      return false;
    }

  }
  bind.remove = function () {
    FlashService.Question('Remover este registro?',
      function () {
        Main.removeTipoExame(bind.novo.id, function () {refreshList(); msgSucesso();}, msgErro);
      });
  };
  function msgErro() {
    FlashService.Error('Não foi possivel editar o registro...');
  }
  function msgErroLoadTipoExames() {
    FlashService.Error('Não foi possivel acessar os dados!');
  }
  function msgSucesso() {
    FlashService.Success('Operação realizada com sucesso');
    $state.go('main.tipoExameSearch');
  }
  function msgAddSucess() {
    FlashService.Success('Operação realizada com sucesso');
    $state.go('main.tipoExameSearch');
  }

});
