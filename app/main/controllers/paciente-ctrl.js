'use strict';
angular.module('main')
.controller('PacienteCtrl', function ($timeout, $filter, $scope, $log, $state, $stateParams, $rootScope, $ionicModal, $ionicPopup, $ionicPopover, Main, FlashService, DataService) {

  $log.log('Paciente.controller');
  var bind = this;
  bind.reload = function () {
    $state.forceReload();
  }
  if ($stateParams.pacienteId){
    bind.novo = $stateParams.pacienteId ? DataService.getPaciente($stateParams.pacienteId,
      function (result) {
        bind.novo = result;
      }, function (msgError) {
        FlashService.Error(msgError);
      }) : {};
  }
  
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

    setTimeout(function(){
      
    
    if($state.current.name === 'main.pacienteHistorico'){
      getSiglaAllList();
      getExameList($stateParams.tipoExameId);
      getTipoExame($stateParams.tipoExameId);
      getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
      $state.forceReload();
    }

    if($state.current.name === 'main.pacienteTipoExame'){
      getSiglaAllList();
      getExameList($stateParams.tipoExameId);
      getTipoExame($stateParams.tipoExameId);
      getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
      $state.forceReload();
    }

  }, 1000);

      
  })();
  setTimeout(function(){
        componentHandler.upgradeDom();
        console.warn('domUpdated');
      },0);
//adiciona novo resultado
// Triggered on a button click, or some other target
 bind.showPopupAdd = function(data, sigla) {
   var dataView = $filter('date')(data, 'dd/MM/yyyy');

   // An elaborate, custom popup
   var myPopup = $ionicPopup.show({
     template: '<input type="text" ng-model="ctrl.resultado.valor"  autofocus />',
     title: dataView+' '+$rootScope.tipoExame.nome+' '+sigla.sigla,
     subTitle: 'Insira o valor do exame',
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Add</b>',
         type: 'button-positive',
         onTap: function(e) {
           if (!bind.resultado.valor) {
             e.preventDefault();
           } else {
             return bind.resultado.valor;
           }
         }
       },
     ]
   });

   myPopup.then(function(res) {
    if(res){
      bind.resultado.data = data;
      bind.resultado.tipo = $rootScope.tipoExame;
      //recupera exame por sigla para obter id exame
       for (var i = 0; i < $rootScope.siglaAllList.length; i++) {
         if($rootScope.siglaAllList[i].sigla === sigla.sigla){
           bind.resultado.exame = $rootScope.siglaAllList[i];
         }
       };

        //post add resultado exame - clearValue is false
        var clearValue = false;
        FlashService.Loading(true, 'aguarde');
        DataService.resultadoAdd($stateParams.pacienteId, bind.resultado, clearValue, function(){
                //incluido com sucesso: msg suprimida para melhor experiência
                FlashService.Loading(false);
                bind.resultado = {};
                getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);

              }, function(msgErro){
                FlashService.Loading(false);
                FlashService.Error(msgErro);            
              });
              $state.forceReload();
      }
    });
  };
//end add resultado

  bind.addDate = function () {
    
       // An elaborate, custom popup
     var myPopup = $ionicPopup.show({
       template: '<input type="date" ng-model="ctrl.resultado.data" />',
       title: 'Data do Exame',
       subTitle: 'Insira a data do exame',
       scope: $scope,
       buttons: [
         { text: 'Cancel' },
         {
           text: '<b>Add</b>',
           type: 'button-positive',
           onTap: function(e) {
             if (!bind.resultado.data) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
             } else {
               return bind.resultado.data;
             }
           }
         },
       ]
     });

     myPopup.then(function(res) {
        if(res){
          $log.debug('selected date: ', bind.resultado.data);
          $rootScope.dataList.push(bind.resultado.data);
          myPopup.close();
          $state.forceReload();
        }
      });
     $timeout(function() {
        myPopup.close(); //close the popup after 10 seconds for some reason
     }, 30000);
   
    
  }

  function randomDate(start, end) {
    var date = new Date(+start + Math.random() * (end - start));
    return date;
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
 
  bind.resultadoRemove = function (objectRemove) {

      FlashService.Question('Remover este resultado?',
        function () {
          FlashService.Loading(true, 'aguarde');
          DataService.resultadoRemove($stateParams.pacienteId, objectRemove, function(){
            //sucesso
            FlashService.Loading(false);
            bind.resultado = {};
            getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId);
            //bind.modal.hide();
            //reload?
          }, function(msgErro){
            FlashService.Loading(false);
            FlashService.Error(msgErro);
            
            //bind.modal.hide();
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
  bind.updateResult = function (data, sigla, valor) {
    bind.updateResult(data, sigla, true);
  };
  bind.updateResult = function (data, sigla, valor) {
    FlashService.Question('Remover este valor?', function () {
      $log.info('update value...'+data+' '+sigla.sigla);
      bind.resultado = {tipo: '', data: '', valor: ''};
      bind.resultado.valor = valor;
      bind.resultado.data = data;
      bind.resultado.tipo = $rootScope.tipoExame;
      //recupera exame por sigla para obter id exame
       for (var i = 0; i < $rootScope.siglaAllList.length; i++) {
         if($rootScope.siglaAllList[i].sigla === sigla.sigla){
           bind.resultado.exame = $rootScope.siglaAllList[i];
         }
       };
      //post update/clearValue resultado exame
      //clear value is true
      var clearValue = true;
      DataService.resultadoAdd($stateParams.pacienteId, bind.resultado, clearValue, function(){
              FlashService.Success('Incluido com sucesso!');
              FlashService.Loading(false);
              bind.resultado = {};
              getResultadoExameList($stateParams.tipoExameId, $stateParams.pacienteId, function () {$state.forceReload();});
            }, function(msgErro){
              FlashService.Error(msgErro);
              FlashService.Loading(false);
              
            });

    },
    function () {
      $log.warn('not update value...');
    });
  };
  function getExameList(tipoId) {

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
        && $rootScope.resultadoExameList[i].exame.sigla === sigla.sigla
        ){
        $log.log('get item exame:'+$rootScope.resultadoExameList[i].data + ' - '+sigla.sigla);
        return $rootScope.resultadoExameList[i];
      }else{
        noHave = true;
      }
    }
    if($rootScope.resultadoExameList.length === 0 || noHave){
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
  function getResultadoExameList(tipoExameId, pacienteId, callback){
    FlashService.Loading(true, "atualizando resultados");
    if(tipoExameId && pacienteId)
    DataService.getResultadoExameList(
      pacienteId,
      tipoExameId,
      function (resultadoExameList) {
          if(resultadoExameList.length === 0){
            FlashService.Loading(false);
            $rootScope.resultadoExameList = resultadoExameList;
            return;
          }
          $rootScope.resultadoExameList = resultadoExameList;

          $rootScope.dataList = [];
          $rootScope.siglaList = [];
          for (var i = 0; i < $rootScope.resultadoExameList.length; i++) {
              if($rootScope.dataList.indexOf($rootScope.resultadoExameList[i].data) === -1){
                $rootScope.dataList.push($rootScope.resultadoExameList[i].data);
              }
              if($rootScope.siglaList.indexOf($rootScope.resultadoExameList[i].exame) === -1){
                $rootScope.siglaList.push($rootScope.resultadoExameList[i].exame);
              }
          };
          for (var i = 0; i < $rootScope.siglaAllList.length; i++) {
            if($rootScope.siglaList.indexOf($rootScope.siglaAllList[i]) === -1){
                $rootScope.siglaList.push($rootScope.siglaAllList[i]);
              }
          }
          if(callback)
            callback();
          FlashService.Loading(false);
      }, function (erroMsg) {
        FlashService.Loading(false);
        FlashService.Error(erroMsg);
        
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
