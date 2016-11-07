'use strict';
angular.module('main')
.controller('PacienteCtrl', function ($filter, $scope, $log, $state, $stateParams, $rootScope, $ionicModal, Main, FlashService, DataService) {

  $log.log('Hello from your Controller: PacienteCtrl in module main:. This is your controller:', this);
  var bind = this;

  bind.openModalShow = true;
  bind.openModalEdit = false;
  bind.showGrid = true;
  bind.showTable = false;
  if ($stateParams.pacienteId)
  bind.novo = $stateParams.pacienteId ? DataService.getPaciente($stateParams.pacienteId, 
    function (result) {
      bind.novo = result;
    }, function (msgError) {
      FlashService.Error(msgError);
    }) : {};
  var count = 0;
   //get list exame
  
  (function init(){
      $rootScope.tipoExame = {};
      $rootScope.tipoExameList = [];
      $rootScope.resultadoExameList = [];
      $rootScope.exameList = [];
      $rootScope.dataList = [];
      $rootScope.siglaList = [];
      $rootScope.pacienteList = [];

      initModalResultAdd();
  })();

  getPacienteList();
  getTipoExameList();
  getTipoExame($stateParams.tipoExameId);
  getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);

//config modal add result
  function initModalResultAdd(){
    $log.log('modal result exame add configured...');
    $ionicModal.fromTemplateUrl('main/templates/resultado-exame-add.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      bind.modal = modal;
    });
  }
  bind.openModalAdd = function () {
    FlashService.Loading(true);
    //get list tipo exame
    DataService.getTipoExameList(
      function (tipoExameList) {
          $rootScope.tipoExameList = tipoExameList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });
   
    bind.modal.show();
  };
  bind.add = function (form) {
    if (form.$valid) {
    
      FlashService.Question('Incluir novo registro?', 
        function () {
          FlashService.Loading(true, 'Incluindo registro');
          Main.addPaciente(bind.novo, function () {
            refreshResultadoList(); msgSucesso();
            FlashService.Loading(false);
          }, msgErro);

        });

    } else {
      return false;
    }
  };
  bind.resultadoAdd = function (form) {
    if (form.$valid) {

      FlashService.Question('Incluir novo resultado?', 
        function () {
          FlashService.Loading(true, 'Incluindo');
          DataService.resultadoAdd($stateParams.pacienteId, bind.resultado, function(){
            FlashService.Success('Incluido com sucesso!');
            FlashService.Loading(false);
            bind.resultado = {};
            getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
            bind.modal.hide();
          }, function(msgErro){
            FlashService.Error(msgErro);
            FlashService.Loading(false);
            bind.modal.hide();
          });
        });

    } else {
      return false;
    }
  };
  bind.resultadoRemove = function (objectRemove) {

      FlashService.Question('Remover este resultado?', 
        function () {
          FlashService.Loading(true, 'Removendo');
          DataService.resultadoRemove($stateParams.pacienteId, objectRemove, function(){
            FlashService.Success('Removido com sucesso!');
            FlashService.Loading(false);
            bind.resultado = {};
            getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
            bind.modal.hide();
            //reload?
          }, function(msgErro){
            FlashService.Error(msgErro);
            FlashService.Loading(false);
            bind.modal.hide();
          });
        });

  };
  bind.msgErroShow = function (msgErro) {
    FlashService.Error(msgErro);
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

  };
  bind.remove = function () {
    FlashService.Question('Remover este registro?', 
      function () {
        Main.removePaciente(bind.novo.id, function () {refreshList(); msgSucesso();}, msgErro);
      });
  };
  bind.refreshExameList = function () {
     //get list exame
    DataService.getExameList(
      function (exameList) {
          $rootScope.exameList = exameList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });

  };
  bind.refreshResultadoList = function () {
     //get list exame
    DataService.getResultadoList(
      function (resultadoList) {
          $rootScope.resultadoList = resultadoList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });
  };
  bind.getValorPorDataPorSigla = function (data, sigla) {
    var result = [];
    for (var i = 0; i < $rootScope.resultadoExameList.length; i++) {
      if($rootScope.resultadoExameList[i].data === data
        && $rootScope.resultadoExameList[i].exame.sigla === sigla
        )
      return $rootScope.resultadoExameList[i];
    }
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
  function getTipoExame(tipoExameId){
    if(tipoExameId){
      FlashService.Loading(true);
      DataService.getTipoExame(tipoExameId,
        function (tipoExame) {
            $rootScope.tipoExame = tipoExame;
            FlashService.Loading(false);
        }, function (erroMsg) {
          FlashService.Error(erroMsg);
          FlashService.Loading(false);
        });
    }
  }
  function getResultadoExameList(tipoExameId, pacienteId){
    FlashService.Loading(true, "carregando tabelas de resultado");
    if(tipoExameId && pacienteId)
    DataService.getResultadoExameList(
      pacienteId,
      tipoExameId,
      function (resultadoExameList) {
          if(resultadoExameList.length === 0){
            FlashService.Loading(false);
            $rootScope.resultadoExameList = [];
            return;
          }
          $rootScope.resultadoExameList = resultadoExameList;

          $rootScope.dataList = [];
          $rootScope.siglaList = [];
          for (var i = 0; i < $rootScope.resultadoExameList.length; i++) {
              if($rootScope.dataList.indexOf($rootScope.resultadoExameList[i].data) === -1){
                $rootScope.dataList.push($rootScope.resultadoExameList[i].data);
              }
              if($rootScope.siglaList.indexOf($rootScope.resultadoExameList[i].exame.sigla) === -1){
                $rootScope.siglaList.push($rootScope.resultadoExameList[i].exame.sigla);
              }
          };
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });
  }
  function getPacienteList() {
    bind.novo = {};
    DataService.getPacienteList(
      function (pacienteList) {
          $rootScope.pacienteList = pacienteList;
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
      });
  }
  /*
  function refreshListExames() {
    if ($stateParams.pacienteId)
    DataService.getExamesPaciente($stateParams.pacienteId,
        function (result) {
            bind.exameList = result;
            //lista todos os exames cadastrados
        }, msgErro);
  };
  */
  function refreshListTipoExames() {
    if ($stateParams.tipoExameId)
    DataService.getExamesPorPacientePorTipo(
      $stateParams.pacienteId,
      $stateParams.tipoExameId,
        function (tipoExameList) {
            $rootScope.tipoExameList = tipoExameList;
            //lista todos os exames cadastrados
        }, msgErro);
  }
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
