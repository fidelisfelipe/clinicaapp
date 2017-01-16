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
  //session mode dependency - begin
  'ngCookies',
  //'ngSanitize',
  'ui.utils.masks',
  'LocalForageModule',
  //session mode dependency - end
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $provide) {

 //override state - force reload
 $provide.decorator('$state', function($delegate, $stateParams) {
        $delegate.forceReload = function() {
            return $delegate.go($delegate.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        };
        return $delegate;
    });

  //override state - force reload

  // ROUTING with ui.router
  $urlRouterProvider.otherwise("main/paciente/1/por/tipoexame/1");///main/login.html
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as ctrl'
    })
   .state('main.home', {
      url: '/home',
      views: {
        'pageContent': {
          templateUrl: 'main/templates/home.html',
          controller: 'HomeCtrl as home'
        }
      }
    })
    .state('main.login', {
        url: '/login',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/login.html',
            controller: 'LoginCtrl as ctrl'
          }
        }
      })
    /** Account Features **/
      .state('main.account', {
        url: '/account',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/account.html',
            controller: 'AccountCtrl as ctrl'
          }
        }
      })
      .state('main.accountDetail', {
        url: '/account/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/account-detail.html',
            controller: 'AccountCtrl as ctrl'
          }
        }
      })
      /** Paciente Features **/
     .state('main.pacienteSearch', {
        url: '/paciente/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-search.html',
            controller: 'PacienteCtrl as ctrl'
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
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
      .state('main.pacienteProntuario', {
        url: '/paciente/prontuario/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-prontuario-detail.html'
          }
        }
      })
      .state('main.pacienteAgenda', {
        url: '/paciente/agenda/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-agenda-detail.html'
          }
        }
      })
      .state('main.pacienteHistorico', {
        url: '/paciente/historico/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-historico-detail.html'
          }
        }
      })
      .state('main.pacienteNotas', {
        url: '/paciente/notas/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-notas-detail.html'
          }
        }
      })
      .state('main.pacienteDocumentos', {
        url: '/paciente/documentos/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-documentos-detail.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteTipoExame', {
        url: '/paciente/:pacienteId/por/tipoexame/:tipoExameId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-resultados-grid.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.tabela', {
        url: '/tabela',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tabela.html',
            controller: 'TabelaCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteLigar', {
        url: '/paciente/ligar/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-ligar-detail.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     /** Exame Features **/
      .state('main.exameSearch', {
        url: '/exame/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/exame-search.html',
            controller: 'ExameCtrl as ctrl'
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
      /** Tipo Exame Features **/
      .state('main.tipoExameSearch', {
        url: '/tipoexame/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/tipoexame-search.html',
            controller: 'TipoExameCtrl as ctrl'
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
      /** Debug Features **/
      .state('main.debug', {
        url: '/debug',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/debug.html',
            controller: 'DebugCtrl as ctrl'
          }
        }
      });
}).run(function ($rootScope, $state, $log, $ionicPlatform, $ionicPopup, $ionicLoading, $cordovaNetwork, Main, UtilService, FlashService, LoginService, DataService) {
  $ionicPlatform.ready(function() {

    $log.info('init app...');
    var status;
    Main.isOnline(function(result){
      status = result;
      $log.debug('Status Backend: ', status);
    });
    
    DataService.prepareRoot();
    DataService.prepareModule();
    //DataService.preparePlatform();

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAyNwpCiUxEpBf9E473z81ku0pNROBFyf4",
      authDomain: "project-263344792902730854.firebaseapp.com",
      databaseURL: "https://project-263344792902730854.firebaseio.com",
      storageBucket: "project-263344792902730854.appspot.com",
      messagingSenderId: "607347890439"
    };

    //TODO: desativado. deve configurar server backend
    //firebase.initializeApp(config);

    setTimeout(function(){
      componentHandler.upgradeDom();
      console.warn('domUpdated');
    }, 0);

    if(window.Connection) {
        if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
                title: "Sua Internet está Desconectada",
                content: "Deseja habilitar sua conexão com a Internet?"
            })
            .then(function(result) {
                if(!result) {
                    ionic.Platform.exitApp();
                }
            });
        }
    }

//check plugins
    $log.log('init cordova plugins');
    if (window.cordova && window.cordova.plugins.Keyboard) {
        $log.log('Keyboard cordova plugins detected!');
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }else{
        $log.info('Keyboard cordova plugins not detected!');
    }
    if (window.StatusBar) {
        $log.log('StatusBar cordova plugins detected!');
        StatusBar.styleDefault();
        //window.StatusBar.styleLightContent();
    }else{
      $log.info('StatusBar cordova plugins not detected!');
    }

    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
         //here you can go to whatever state you want, and you also have a lot of information to save if needed
         $log.error("state:"+toState.current.name+ " error: "+error);
    });
//watch for change state
    $rootScope.$on('$stateChangeSuccess', function(evt){
      setTimeout(function(){
        componentHandler.upgradeDom();
        console.warn('domUpdated');
      },0);

      //document.getElementById("logout").checked = true;
        //$state.go('main.login');
       //TODO: Check Autorization and redirect (home, login)
       
       $rootScope.userCurrent = UtilService.getUserCurrentLocal();
        if($rootScope.userCurrent !== undefined && 
          $rootScope.userCurrent.isAuthorized){
          $log.info('You is Authorized');
          //if($state.current.name === 'main.login'){
          //  $state.go($state.current.name);
          //}
        } else {
          $log.warn('You is Not Authorized');
          $log.warn('Redirect Request for main.login...');
          //$state.go('main.login');
        }

      $log.log('state change success it: '+$state.current.name);
    });
  //watch for signout
    $rootScope.$on('signout', function () {
      $log.log('receiver in auth signout...');
      $state.go('main.login');
    });
  //watch for signin
    $rootScope.$on('signin', function () {
      $log.log('receiver in auth signin...');
      $state.go('main.home');
    });
  });

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