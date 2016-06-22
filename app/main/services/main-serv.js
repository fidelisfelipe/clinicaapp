'use strict';
angular.module('main')
.service('Main', function ($log, $timeout) {

  $log.log('Hello from your Service: Main in module main');
  // some initial data
  this.someData = {
    binding: 'Yes! Got that databinding working'
  };

  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah this was changed';

    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

  function onValidTestBackend (data) {
    if (data.status === 200) {
      $log.debug('request success: ', data);
    } else {
      $log.error('request error: ', data);
    }
  }
  function onErrorTestBackend (data) {
    $log.error('request error: ', data);
  }

});
