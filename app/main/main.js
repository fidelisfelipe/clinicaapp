'use strict';
//OO representation bussines init
function TipoExame(codigo, nome){
  this.codigo = codigo;
  this.nome = nome;
}

function Exame(codigo, nome, sigla, descricao, tipoExame){
  this.codigo = codigo;
  this.nome = nome;
  this.sigla = sigla;
  this.descricao = descricao;
  this.tipoExame = tipoExame;
}

function ResultadoExame(exame, valor, data){
  this.exame = exame;
  this.valor = valor;
  this.data = data;
}

function Paciente(codido, nome, responsavel, dataNascimento, telefone, sexo, estadoCivil, naturalidade, profissao, resultadoList) {
  this.codigo = codigo;
  this.nome = nome;
  this.cpf = cpf;
  this.rg = rg;
  this.dataNascimento = dataNascimento;
  this.responsavel = responsavel;
  this.telefone = telefone;
  this.sexo = sexo;
  this.estadoCivil = estadoCivil;
  this.naturalidade = naturalidade;
  this.profissao = profissao;
  this.resultadoList = resultadoList;
}

function TabelaExame (tipo, siglaList, dataList, valorList) {
  this.tipo = tipo;
  this.siglaList = siglaList;//lista de siglas sem repetição - resultadoList
  this.dataList = dataList;
  this.valorList = valorList;
}

function desenharTabela(paciente, tipo){
  //deve receber o paciente
  //recuperar seus resultados
  //recuperar tipos destes resultados

  //recuperar datas destes resultados por tipo
  //plotar siglas
  //plotar datas
  //plotar valores
}

//OO representation bussines end
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
  'ngMessages',
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider) {

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/login');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
    })
    .state('main.login', {
        url: '/login',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/login.html',
            controller: 'LoginCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.account', {
        url: '/account',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/account.html',
            controller: 'AccountCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.home', {
        url: '/home',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/home.html',
            controller: 'HomeCtrl as ctrl',
            cache: false
          }
        }
      })
     .state('main.pacienteSearch', {
        url: '/paciente/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-search.html',
            controller: 'PacienteCtrl as ctrl',
            cache: false
          }
        }
      })
     .state('main.pacienteAdd', {
        url: '/paciente/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-detail.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteDetail', {
        url: '/paciente/detail/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-detail.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteExames', {
        url: '/paciente/exames/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-exames-detail.html',
            controller: 'PacienteExameCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteTipoExame', {
        url: '/paciente/:pacienteId/tipoexame/:tipoExameId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-tipoexame-detail.html',
            controller: 'HemogramaCtrl as ctrl'
          }
        }
      })
      .state('main.exameSearch', {
        url: '/exame/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/exame-search.html',
            controller: 'ExameCtrl as ctrl',
            cache: false
          }
        }
      })
     .state('main.exameAdd', {
        url: '/exame/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/exame-detail.html',
            controller: 'ExameCtrl as ctrl'
          }
        }
      })
      .state('main.exameDetail', {
        url: '/exame/detail/:exameId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/exame-detail.html',
            controller: 'ExameCtrl as ctrl'
          }
        }
      })
      .state('main.tipoExameSearch', {
        url: '/tipoexame/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tipoexame-search.html',
            controller: 'TipoExameCtrl as ctrl',
            cache: false
          }
        }
      })
     .state('main.tipoExameAdd', {
        url: '/tipoexame/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tipoexame-detail.html',
            controller: 'TipoExameCtrl as ctrl'
          }
        }
      })
      .state('main.tipoExameDetail', {
        url: '/tipoexame/detail/:tipoExameId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tipoexame-detail.html',
            controller: 'TipoExameCtrl as ctrl'
          }
        }
      })
     

    .state('main.config', {
        url: '/config',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/config.html',
            controller: 'ConfigCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.tabelaAdd', {
        url: '/tabela/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tabela-detail.html',
            controller: 'TabelaCtrl as ctrl'
          }
        }
      })
      .state('main.tabelaDetail', {
        url: '/tabela/detail/:tabelaId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tabela-detail.html',
            controller: 'TabelaCtrl as ctrl'
          }
        }
      })
      .state('main.tabelaSearch', {
        url: '/tabelas/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tabelas-search.html',
            controller: 'TabelaCtrl as ctrl'
          }
        }
      })
      .state('main.tabelasList', {
        url: '/tabelas/list',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tabelas.html',
            controller: 'TabelaCtrl as ctrl'
          }
        }
      })
      .state('main.hemograma', {
        url: '/hemograma',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/hemograma.html',
            controller: 'HemogramaCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.hemogramaAdd', {
        url: '/hemograma/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/hemograma-form.html',
            controller: 'HemogramaFormCtrl as ctrl'
          }
        }
      })
      .state('main.eas', {
        url: '/eas',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/eas.html',
            controller: 'EasCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.listDetail', {
        url: '/list/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/list-detail.html',
            controller: 'ListCtrl as ctrl'
          }
        }
      })
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
}).run(function ($rootScope, $state, $log, $ionicPlatform, $ionicPopup, $ionicLoading, $cordovaNetwork, Main, FlashService, LoginService, ConnectivityMonitor) {
  $rootScope.appLoaded = false;

  $ionicPlatform.ready(function() {

    $log.log('init app...');

    $rootScope.appStatusView = 'Iniciando...';

    $log.log('Platform online network: ' + navigator.onLine);
    $log.log('Platform name:', ionic.Platform.platform());
    $log.log('Platform version:', ionic.Platform.version());
    $log.log('Platform isWebView:', ionic.Platform.isWebView());
    $log.log('Platform isAndroid:', ionic.Platform.isAndroid());

    Main.isOnline(function (isOnline) {
      $rootScope.isOnline = isOnline;
      $log.log('Main.isOnline:', $rootScope.isOnline);
    });

    $rootScope.appLoaded = true;

    $rootScope.usuarioWeb = {isLogado: false};
    $rootScope.logout = function () {
      //TODO: send request logout

        FlashService.Question('Deseja realmente sair do sistema?', 
        function () {
          FlashService.Loading(true, 'Realizando Logout...');
          LoginService.Logout(
            function(){
              $rootScope.usuarioWeb.isLogado = false;
              $state.go('main.login');
              FlashService.Success('Logout efetuado com sucesso!');
            }, 
            function(){
              FlashService.Error('Falha ao realizar Logout!');
            });
          FlashService.Loading(false);
        });
    }

    $rootScope.appStatusView = $rootScope.usuarioWeb.isLogado ? 'Bem vindo '+$rootScope.usuarioWeb.nome : 'Usuário não está logado!';

  });

}); 

/**
      $rootScope.isWebView = ionic.Platform.isWebView();
      $rootScope.isAndroid = ionic.Platform.isAndroid();

      $rootScope.currentPlatform = ionic.Platform.platform();
      $rootScope.currentPlatformVersion = ionic.Platform.version();

      $log.log('init app...');
      $log.log('Platform isWebView:',   $rootScope.isWebView);
      $log.log('Platform isAndroid:',   $rootScope.isAndroid);

      $log.log('Platform Device current: ' +
        $rootScope.currentPlatform +
        ' version: ' +
        $rootScope.currentPlatformVersion); 
      $log.log('Platform isAndroid:',   $rootScope.isAndroid);
      //check backend status init
      $rootScope.backendStatus;
      $rootScope.backendOnline = false;
      $rootScope.backendOffline = true;
      $rootScope.appLoading = true;
      $rootScope.appLoaded = false;
      $rootScope.appStatusView = 'Iniciando...';
      $rootScope.appStatusValue = 10;

      $rootScope.hideLoading = function() {
         $rootScope.loading.hide();
      }
      $rootScope.showLoading = function(message) {
          var message = message || "Chargement";

          // Show the loading overlay and text
          $rootScope.loading = $ionicLoading.show({

            // The text to display in the loading indicator
             template: '<i class=" ion-loading-c"></i> '+ message,

            // The animation to use
            animation: 'fade-in',

            // Will a dark overlay or backdrop cover the entire view
            showBackdrop: true,

            // The maximum width of the loading indicator
            // Text will be wrapped if longer than maxWidth
            maxWidth: 200,

            // The delay in showing the indicator
            showDelay: 0
          });
      };

      $rootScope.showLoading('Iniciando...');

      Main.backendStatus(function (status) {
        $rootScope.backendStatus = status;
        $log.log('Backend status: ', $rootScope.backendStatus);
        $rootScope.appStatusValue = 50;

        if ($rootScope.backendStatus === 200) {
            $rootScope.backendOnline = true;
            $rootScope.appLoaded = true;
            $rootScope.appStatusView = 'Pronto!';
            $rootScope.hideLoading();
        }

        if ($rootScope.backendStatus === 'ERR_CONNECTION_REFUSED') {
           $rootScope.backendOffline = true;
            $ionicPopup.alert({
                title: "Backend Disconnected",
                content: "The server is disconnected on your device."
            });
            $rootScope.appStatusView = 'Dados não sincronizados.';
            $rootScope.appLoaded = true;
            $rootScope.hideLoading();
        }

        $rootScope.appStatusValue = 100;
        
      });

      //check backend status end

      if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
              $ionicPopup.confirm({
                  title: "Internet Disconnected",
                  content: "The internet is disconnected on your device."
              })
              .then(function(result) {
                  if(!result) {
                      ionic.Platform.exitApp();
                  }
              });
          } else {
            alert('isUnknown() ' + (navigator.connection.type === 'unknown'));
          }
      }

  });
**/


angular.module('main').factory('ConnectivityMonitor', function($rootScope, $cordovaNetwork){
 
  return {
    isOnline: function(){
      if(ionic.Platform.isWebView()){
        return $cordovaNetwork.isOnline();    
      } else {
        return navigator.onLine;
      }
    },
    isOffline: function(){
      if(ionic.Platform.isWebView()){
        return !$cordovaNetwork.isOnline();    
      } else {
        return !navigator.onLine;
      }
    },
    startWatching: function(){
        if(ionic.Platform.isWebView()){
 
          $rootScope.$on('$cordovaNetwork:online', function(event, networkState){
            console.log("went online");
          });
 
          $rootScope.$on('$cordovaNetwork:offline', function(event, networkState){
            console.log("went offline");
          });
 
        }
        else {
 
          window.addEventListener("online", function(e) {
            console.log("went online");
          }, false);    
 
          window.addEventListener("offline", function(e) {
            console.log("went offline");
          }, false);  
        }       
    }
  }
});

angular.module('main').filter('unique', function () {
  return function (input, key) {
    var unique = {};
    var uniqueList = [];
    for (var i = 0; i < input.length; i++) {
      if (typeof unique[input[i][key]] === 'undefined') {
        unique[input[i][key]] = '';
        uniqueList.push(input[i]);
      }
    }
    return uniqueList;
  };
});
