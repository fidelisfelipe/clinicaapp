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
  $urlRouterProvider.otherwise('/main/home');
  $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('main', {
      url: '/main',
      abstract: true,
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuCtrl as menu'
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
}).run(function ($rootScope, $state, $log, $ionicPlatform, $ionicPopup, Main) {
  $rootScope.$on('$stateChangeSuccess', function () {$log.log($state.current.name === 'main.debug'); if ($state.current.name === 'main.debug') {Main.backendOnline();}});

  $ionicPlatform.ready(function() {
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
          }
      }
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
