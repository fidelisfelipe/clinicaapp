'use strict';
angular.module('main')
.controller('PacienteCtrl', function ($filter, $scope, $log, $state, $stateParams, $rootScope, $ionicModal, $ionicPopover, Main, FlashService, DataService) {

  $log.log('Paciente.controller');
  var bind = this;
  bind.showSelectedTable = 'material';
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

  (function init(){
      
      //$rootScope.tipoExame = {};
      //$rootScope.tipoExameList = [];
      $rootScope.resultadoExameList = [];
      //$rootScope.exameList = [];
      $rootScope.dataList = [];
      $rootScope.siglaList = [];
      $rootScope.siglaAllList = [];
      //$rootScope.pacienteList = [];
      $rootScope.profissaoList = [{nome: 'Desenvolvedor'},{nome: 'Professor'}];

    if($state.current.name === 'main.pacienteSearch')
        getPacienteList();
      
    if($state.current.name === 'main.pacienteExames')
      getTipoExameList();

    if($state.current.name === 'main.pacienteTipoExame'){
       getSiglaAllList();
      //getResultadoListAll();
      //getTipoExame($stateParams.tipoExameId);
      getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
      
      //$state.forceReload;
    }


      initModalResultAdd();

      
  })();

  $ionicPopover.fromTemplateUrl('main/templates/paciente-dados-popover.html', {
    scope: $scope
  }).then(function(popover) {
    bind.popover = popover;
  });
  bind.addDate = function () {
    
    FlashService.Question('Incluir Resultados?',
      function () {
        $log.log('add date new');
        $rootScope.dataList.push(new Date());
         FlashService.Loading(false);
         $state.forceReload();
      });
   
    
  }
  bind.removeLastDate = function () {
    FlashService.Question('Remover a última data?',
      function () {
        $log.log('remove date column');
        $rootScope.dataList.remove($rootScope.dataList.length);
         FlashService.Loading(false);
         $state.forceReload();
      });
  }
  //default grid
  bind.showSelectedTable = 'grid';
  bind.showTable = function (tableName){
    $log.log('select table: '+tableName);
    bind.showSelectedTable = tableName;
  }

  bind.openDados = function($event) {
    bind.popover.show($event);
  };
  bind.closeDados = function() {
    bind.popover.hide();
  };
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
            getPacienteList();
            msgSucesso();
          }, function (msgErro) {
            FlashService.Error(msgErro);
          });

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
                getPacienteList();
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
  bind.addResultInDate = function (data, sigla, index) {
    var resultado = {'data': data, 'valor': '', 'exame': {'sigla': sigla}};
    FlashService.ModalAddResult(sigla, $filter('date')(data, 'dd/MM/yyyy'), 0, function(){
      
      DataService.resultadoAdd($stateParams.pacienteId, resultado, function(){
            FlashService.Success('Incluido com sucesso!');
            FlashService.Loading(false);
            var resultado = {};
            getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
            $state.forceReload();
          }, function(msgErro){
            FlashService.Error(msgErro);
            FlashService.Loading(false);
            
          });

    });
      //, sigla, index, 
      //null,null,null,function(){


    //title, data, sigla, index, successCallBack
    
    
    //FlashService.Question(data, sigla, index, function (){$log.debug('success add result');};
    /** 
    FlashService.Question(sigla+' em '+$filter('date')(data, 'dd/MM/yyyy')+' valor '+1234+'?',
      function () {
      var resultado = {data: data, sigla: sigla};

      DataService.resultadoAdd($stateParams.pacienteId, resultado, function(){
            FlashService.Success('Incluido com sucesso!');
            FlashService.Loading(false);
            var resultado = {};
            getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
            $state.forceReload();
          }, function(msgErro){
            FlashService.Error(msgErro);
            FlashService.Loading(false);
            
          });
      });
    **/
  };
  bind.refreshExameList = function (tipoId) {

     //get list exame
    if(tipoId)
    DataService.getExameAssociadoList(tipoId,
      function (exameList) {
          $rootScope.exameList = [];
          $rootScope.exameList = exameList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
        FlashService.Loading(false);
      });

  };
  bind.refreshResultadoList = function () {
     //get list exame
    DataService.getResultadoExameList(
      function (resultadoList) {
          $rootScope.resultadoList = resultadoList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
      });
  };

  bind.getValorPorDataPorSigla = function (data, sigla) {
    var result = [];
    var noHave = false;
    for (var i = 0; i < $rootScope.resultadoExameList.length; i++) {
      if($rootScope.resultadoExameList[i].data === data
        && $rootScope.resultadoExameList[i].exame.sigla === sigla
        ){
        $log.log('get item exame:'+$rootScope.resultadoExameList[i].data + ' - '+sigla);
        return $rootScope.resultadoExameList[i];
      }else{
        noHave = true;
      }
    }
    if(noHave){
      var returnVazio = {valor: 'vazio'}; 
        return returnVazio;
    }
  };
  bind.calcularIdade = function (nascimento) {
        // parâmetro nascimento deve ser um objeto do tipo Date
        var idadeDifMs = Date.now() - new Date(nascimento).getTime();
        var idadeData = new Date(idadeDifMs);

        return Math.abs(idadeData.getUTCFullYear() - 1970);
    }

  function getResultadoListAll() {
     //get list exame
    DataService.getResultadoExameList(
      function (resultadoList) {
          $rootScope.resultadoList = resultadoList;
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
      });
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
          for (var i = 0; i < $rootScope.siglaAllList.length; i++) {
            if($rootScope.siglaList.indexOf($rootScope.siglaAllList[i].sigla) === -1){
                $rootScope.siglaList.push($rootScope.siglaAllList[i].sigla);
              }
          }
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
  function getSiglaAllList() {
    bind.novo = {};
    DataService.getSiglaAllList(
      function (siglaList) {
          $rootScope.siglaAllList = siglaList;
          $rootScope.siglaList = siglaList;
      }, function (erroMsg) {
        FlashService.Error(erroMsg);
      });
  }

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
