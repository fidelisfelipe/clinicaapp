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
  'ui.utils.masks',
  'LocalForageModule',
  //session mode dependency - end
  // TODO: load other modules selected during generation
])
.config(function ($stateProvider, $urlRouterProvider, $provide) {
    //force reload
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

  // ROUTING with ui.router
  $urlRouterProvider.otherwise('/main/login');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as ctrl'
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
      .state('main.accountDetail', {
        url: '/account/detail',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/account-detail.html',
            controller: 'AccountCtrl as ctrl',
            cache: false
          }
        }
      })
      .state('main.prontuario', {
        url: '/prontuario',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/prontuario.html',
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
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteAdd', {
        url: '/paciente/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-data.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
     .state('main.pacienteDetail', {
        url: '/paciente/detail/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-data.html',
            controller: 'PacienteCtrl as ctrl'
          }
        }
      })
      .state('main.pacienteData', {
        url: '/paciente/data/:pacienteId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/paciente-data.html',
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
            templateUrl: 'main/templates/paciente-tipoexame-detail.html',
            controller: 'PacienteCtrl as ctrl',
            cache: false, //required for state.forceReload
          }
        }
      })
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
            controller: 'HemogramaCtrl as ctrl'
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
}).run(function ($rootScope, $state, $log, $ionicPlatform, $ionicPopup, $ionicLoading, $cordovaNetwork, Main, UtilService, FlashService, LoginService, ConnectivityMonitor) {
  $rootScope.appLoaded = false;
  $ionicPlatform.ready(function() {

    $log.info('init app...');
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAyNwpCiUxEpBf9E473z81ku0pNROBFyf4",
      authDomain: "project-263344792902730854.firebaseapp.com",
      databaseURL: "https://project-263344792902730854.firebaseio.com",
      storageBucket: "project-263344792902730854.appspot.com",
      messagingSenderId: "607347890439"
    };
    firebase.initializeApp(config);

    setTimeout(function(){
      componentHandler.upgradeDom();
      console.warn('domUpdated');
    }, 0);

    $rootScope.appStatusView = 'Iniciando...';
    var infoPlatform = ionic.Platform;
    $log.log('Platform Info:',  JSON.stringify(infoPlatform));
    $log.log('Platform online network: ' + navigator.onLine);
    $log.log('Platform name:', ionic.Platform.platform());
    $log.log('Platform version:', ionic.Platform.version());
    $log.log('Platform isWebView:', ionic.Platform.isWebView());
    $log.log('Platform isAndroid:', ionic.Platform.isAndroid());

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
//session ctrl
//clean user session
  	$log.debug('init session ctrl - begin');
    $rootScope.userCurrent = UtilService.getUserCurrentLocal();

  	if(!$rootScope.userCurrent.isAuthorized) {
  		$log.info('user not found...');
  	} else {
  		$log.log('user found:', $rootScope.userCurrent.name);
  	}
  	$log.debug('init session ctrl - end');

//check redirect where isauthorized
    if($rootScope.userCurrent.isAuthorized){
      $log.info('You is Authorized');
      if($state.current.name === 'main.login'){
        $state.go('main.home');
      }
    }

//watch for change state
    $rootScope.$on('$stateChangeSuccess', function(evt){
      setTimeout(function(){
        componentHandler.upgradeDom();
        console.warn('domUpdated');
      },0);

      document.getElementById("logout").checked = true;

       $rootScope.userCurrent = UtilService.getUserCurrentLocal();
        if($rootScope.userCurrent.isAuthorized){
          $log.info('You is Authorized');
          if($state.current.name === 'main.login'){
            $state.go('main.home');
          }
        } else {
          $log.warn('You is Not Authorized');
          $log.warn('Redirect Request for main.login...');
          $state.go('main.login');
        }
      $log.log('state change success it: '+$state.current.name);
    });//AuthSocialBackandService.onChangeSuccess
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
    //check backend online
    Main.isOnline(function (isOnline) {
      $rootScope.isOnline = isOnline;
      $log.log('Main.isOnline:', $rootScope.isOnline);
    });

    $rootScope.appLoaded = true;
    $rootScope.logout = function () {
      //TODO: send request logout

        FlashService.Question('Deseja realmente sair do sistema?',
        function () {
          FlashService.Loading(true, 'Realizando Logout...');
          LoginService.Logout(
            function(){
              $state.go('main.login');
            },
            function(){
              FlashService.Error('Falha ao realizar Logout!');
            });
          FlashService.Loading(false);
        });
    }

    $rootScope.status = $rootScope.userCurrent.isAuthorized ? 'Bem vindo '+$rootScope.userCurrent.nome : 'Usuário não está logado!';

  });

});

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
