'use strict';
angular.module('main')
.service('Main', function ($log, $timeout, $http, $rootScope, Config) {
  var bind = this;
  $log.log('Hello from your Service: Main in module main');
  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah Service Working!';
    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

  this.features = function (callback, fail) {
    $http({
      method: 'GET',
      url: Config.ENV.DOMAIN_BACKEND_URL + '/features'
    })
    .then(function (response) {
      if (response.status === 200) {
        callback(response.data.features);
      } else {
        fail();
      }
    }.bind(this))
      .then($timeout(function () {
      }.bind(this), 6000));
  };

  this.backendOnline = function () {
    bind.status = false;
    $http({
      method: 'GET',
      url: Config.ENV.DOMAIN_BACKEND_URL
    }).then(function (response) {
      if (response.status === 200) {
        bind.status = true;
      } else {
        bind.status = false;
      }
    }.bind(this)).then($timeout(function () {
      $rootScope.backendOnline = bind.status;
    }.bind(this), 5000));
  };
});
