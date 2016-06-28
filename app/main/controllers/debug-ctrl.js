'use strict';
angular.module('main')
.controller('DebugCtrl', function ($log, $http, $timeout, Main, Config, $cordovaDevice) {

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

  // Proxy
  this.proxyState = 'ready';
  this.proxyRequestUrl = Config.ENV.SOME_OTHER_URL + '/get';
  this.backendUri = '';
  this.backendMethod = 'GET';
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
  this.data = {'features': {'items': {}, 'size': 0}};
  //Backend
  Main.features(function (features) {
    bind.data.features.items = features;
    angular.forEach(bind.data.features.items, function () {
      bind.data.features.size = bind.data.features.size + 1;
    });
    $log.log(bind.data.features.items, bind.data.features.size);
  }, function () {
    $log.log('fail load features...');
  });
  this.backendTest = function () {
    this.urlSended = this.backendRequestUrl + this.backendUri;
    this.backendState = '...';
    this.backendConsole = '';
    $http.get(this.backendRequestUrl + this.backendUri)
    .then(function (response) {
      bind.backendStatus = response.status;
      $log.log(response);
      this.backendConsole = response;
      this.backendState = 'success (result printed to browser console)';
    }.bind(this), function (response) {
      bind.backendStatus = response.status;
      if (response.status) {
        bind.backendConsole = response;
      }
    }).then($timeout(function () {
      this.backendState = 'ready';
    }.bind(this), 6000));
  };

});
