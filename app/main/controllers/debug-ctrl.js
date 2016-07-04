'use strict';
angular.module('main')
.controller('DebugCtrl', function ($log, $http, $timeout, Main, Config, $cordovaDevice, $interval, $rootScope, FlashService) {

  $log.log('Hello from your Controller: DebugCtrl in module main:. This is your controller:', this);
  var bind = this;
  // bind data from services
  this.someData = Main.someData;
  this.serviceTest = function () {Main.changeBriefly();};
  this.ENV = Config.ENV;
  this.BUILD = Config.BUILD;

  // get device info
  ionic.Platform.ready(function () {
    if (ionic.Platform.isWebView()) {
      this.device = $cordovaDevice.getDevice();
    }
  }.bind(this));
  function loadFeatures (features) {
    bind.data.features.items = features;
    angular.forEach(bind.data.features.items, function () {
      bind.data.features.size = bind.data.features.size + 1;
    });
    $log.log(bind.data.features.items, bind.data.features.size);
  }

  (function init () {
    bind.backendStatus = '';
    FlashService.Loading(true, 'loading a functions fo backend...');
    bind.backendOnline = 'loading';
    Main.features(loadFeatures, function () {
      $log.log('fail load features...');
    });
    FlashService.Loading(false);
  })();

  // Proxy
  this.proxyState = 'ready';
  this.proxyRequestUrl = Config.ENV.SOME_OTHER_URL + '/get';
  this.backendUri = '';
  this.backendMethod = '';
  this.backendState = 'ready';
  this.backendRequestUrl = Config.ENV.DOMAIN_BACKEND_URL;
  this.proxyTest = function () {
    this.proxyState = '...';
    $http({
      method: this.backendMethod,
      url: this.urlSended
    })
    .then(function (response) {
      $log.log(response);
      this.proxyState = 'success (result printed to browser console)';
    }.bind(this))
    .then($timeout(function () {
      this.proxyState = 'ready';
    }.bind(this), 6000));
  };
  this.data = {'tests': {'items': {}}, 'features': {'items': {}, 'size': 0}};

  //Backend

  this.backendTest = function () {
    this.urlSended = this.backendRequestUrl + this.backendUri;
    this.backendState = '...';
    this.backendConsole = '{}';
    bind.backendStatus = '';
    $http.get(this.backendRequestUrl + this.backendUri)
    .then(function (response) {
      bind.backendStatus = response.status;
      $log.log(response);
      bind.backendConsole = response;
      bind.backendState = 'success (result printed to browser console)';
    }.bind(this), function (response) {
      bind.backendStatus = response.status;
      if (response.status) {
        bind.backendConsole = response;
      }
    }).then($timeout(function () {
      this.backendState = 'ready';
    }.bind(this), 6000));
  };
  $rootScope.$on('refreshStatusBackend', function () {Main.backendOnline();});

  this.intervalTest = function () {
    if (this.continueTest) {
      $log.log('intervalTest');
      bind.stopInterval = $interval(function () {
        $log.log('send refreshStatusBackend');
        $rootScope.$broadcast('refreshStatusBackend');}, 60000);
    } else {
      $interval.cancel(bind.stopInterval);
    }
  };
  this.submit = {test: {descricao: 'Descrição'}};

  this.submitFormTest = function () {
    bind.addStatus = '';
    FlashService.Loading(true, 'send request...');
    $log.log('submitFormTest...');
    $http({
      url: this.backendRequestUrl + '/tests/add',
      method: 'post',
      data: this.submit
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.addStatus = response.status;
      bind.listTests();
    }.bind(this))
      .then($timeout(function () {
        FlashService.Loading(false);
      }.bind(this), 6000));
  };
  this.listTests = function () {
    bind.addStatus = '';
    FlashService.Loading(true, 'send request...');
    $log.log('list Test...');
    $http({
      url: this.backendRequestUrl + '/tests',
      method: 'get',
      data: this.submit
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.addStatus = response.status;

      if (response.status === 200) {
        bind.data.tests.items = response.data.tests;
      }

    }.bind(this))
      .then($timeout(function () {
        FlashService.Loading(false);
      }.bind(this), 6000));
  };
  this.removeTest = function (id) {
    bind.addStatus = '';
    FlashService.Loading(true, 'send request...');
    $log.log('remove Test...');
    $http({
      url: this.backendRequestUrl + '/tests/' + id,
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      data: {'_method': 'delete', test: {id: id}}
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.addStatus = response.status;

      if (response.status === 200) {
        bind.listTests();
      }
    }.bind(this))
     .then($timeout(function () {
       FlashService.Loading(false);
     }.bind(this), 6000));
  };
  this.loadUpdateTest = function (id) {
    this.updateItem = '';
    bind.addStatus = '';
    FlashService.Loading(true, 'send request...');
    $log.log('load Test...');
    $http({
      url: this.backendRequestUrl + '/tests/' + id,
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      data: {'_method': 'get', test: {id: id}}
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.updateItem = response.data.test;
      $log.log(bind.updateItem.descricao);
    }.bind(this))
      .then($timeout(function () {
        FlashService.Loading(false);
      }.bind(this), 6000));
  };
  this.updateTest = function (id) {
    this.updateItem = '';
    bind.addStatus = '';
    FlashService.Loading(true, 'send request...');
    $log.log('update Test...');
    $http({
      url: this.backendRequestUrl + '/tests/' + id,
      method: 'get',
      headers: {'Content-Type': 'application/json'},
      data: {'_method': 'put', test: {id: id, descricao: bind.testUpdate.descricao}}
    }).then(function (response) {
      $log.log(response);
      FlashService.Loading(false);
      FlashService.Success('response:' + JSON.stringify(response.data));
      bind.updateItem = response.data.test;
      $log.log(bind.updateItem.descricao);
    }.bind(this))
      .then($timeout(function () {
        FlashService.Loading(false);
      }.bind(this), 6000));
  };
});
