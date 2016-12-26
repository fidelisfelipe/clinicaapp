'use strict';
angular.module('main')
.controller('ExameCtrl', function ($log, $state, $stateParams, $rootScope, Main, FlashService, DataService) {

  $log.log('Exame.controller');
  var bind = this;
  bind.novo = $stateParams.exameId ? Main.getExame($stateParams.exameId, function (result) {
    bind.novo = result;
  }, msgErro) : {};
  var count = 0;

  (function init(){
    if($state.current.name === 'main.exameSearch')
      getExameList();

    if($state.current.name === 'main.exameDetail')
      getTipoExameList();

    if($state.current.name === 'main.exameAdd')
      getTipoExameList();

  })();

  function getExameList() {
    bind.novo = {};
    Main.exames(
      function (result) {
          $rootScope.exameList = result;
      }, msgErroLoadExames);
  };
  function getTipoExameList() {
    DataService.getTipoExameList(
      function (tipoExameList) {
          $rootScope.tipoExameList = tipoExameList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });
  }
  bind.add = function (form) {
    if (form.$valid) {
      bind.novo.id = null;
      if(!bind.novo.tipo){
        FlashService.Error('Tipo de Exame é Obrigatório!');
        return false;
      }
      FlashService.Question('Incluir novo registro?', 
        function () {
          //TODO: mover para DataService
          DataService.addExame(bind.novo, function () {
            getExameList();
            msgSucesso();
          }, function () {
            FlashService.Error('Não foi possivel incluir o registro...');
          });
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
          Main.editExame(bind.novo, function () {
            getExameList();
            msgSucesso();
          }, msgErro);
        });
    } else {
      return false;
    }

  }
  bind.remove = function () {
    FlashService.Question('Remover este registro?', 
      function () {
        Main.removeExame(bind.novo.id, function () {
          getExameList();
          msgSucesso();
        }, msgErro);
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
