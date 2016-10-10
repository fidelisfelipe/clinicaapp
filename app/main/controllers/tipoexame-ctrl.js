'use strict';
angular.module('main')
.controller('TipoExameCtrl', function ($log, $state, $stateParams, $rootScope, Main, FlashService) {

  $log.log('Hello from your Controller: TipoExameCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.tipoExameId ? Main.getTipoExame($stateParams.tipoExameId, function (result) {
    bind.novo = result;
  }, msgErro) : {};
  var count = 0;
  $rootScope.tipoExameList = [];
  function refreshList() {
    bind.novo = {};
    Main.tipoExames(
      function (result) {
          $rootScope.tipoExameList = result;
      }, msgErroLoadTipoExames);
  };
  refreshList();
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
