'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
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
     .state('main.pacientes', {
        url: '/pacientes',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/pacientes.html',
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
      .state('main.itemSearch', {
        url: '/itens/search',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/itens-search.html',
            controller: 'ItemCtrl as ctrl'
          }
        }
      })
      .state('main.itemAdd', {
        url: '/item/add',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/item-add.html',
            controller: 'ItemCtrl as ctrl'
          }
        }
      })
      .state('main.itemDetail', {
        url: '/item/detail/:itemId',
        views: {
          'pageContent': {
            templateUrl: 'main/templates/item-detail.html',
            controller: 'ItemCtrl as ctrl'
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
}).run(function ($rootScope, $state, $log, Main) {
  $rootScope.$on('$stateChangeSuccess', function () {$log.log($state.current.name === 'main.debug'); if ($state.current.name === 'main.debug') {Main.backendOnline();}});
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

