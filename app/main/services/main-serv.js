'use strict';
angular.module('main')
.service('Main', function ($log, $timeout, $http, $rootScope, Config) {
  var bind = this;

  $rootScope.render = [];
  this.siglasGeral = function () {return ['HEM', 'HB', 'HCL'];}

  bind.registros = [
     {'id':'1', 'data': '10/01/2016', 'sigla': bind.siglasGeral()[0], 'value': Math.floor((Math.random()*99)+1)},
     {'id':'2', 'data': '10/02/2016', 'sigla': bind.siglasGeral()[1], 'value': Math.floor((Math.random()*99)+1)},
     {'id':'3', 'data': '10/02/2016', 'sigla': bind.siglasGeral()[2], 'value': Math.floor((Math.random()*99)+1)}
     ];
  $rootScope.registros = bind.registros;

  $log.log('Hello from your Service: Main in module main');

  this.render = function () {
    return $rootScope.render;
  };

  //registros
  this.registrosAdd = function (registro) {
    if (registro.sigla && registro.data && registro.value) {
      $log.log('added: ', registro);
      registro.id = Math.floor((Math.random()*99)+1);//TODO: Remover qnd colocar o backend
      $rootScope.registros.push(registro);
    }
  }

  this.registros = function () {
    return $rootScope.registros;
  };
  //siglas
  this.siglas = function () {
    var siglas = unique($rootScope.registros, 'sigla');
    $rootScope.siglas = siglas;
    return $rootScope.siglas;
  };
  //datas
  this.datas = function () {
    $rootScope.datas = unique($rootScope.registros, 'data');
    return $rootScope.datas;
  }

//Util - TODO:migration for util
  function unique(input, key) {
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

//OLD REFS REST 
  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah Service Working!';
    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

  this.features = function (callback, fail) {
    $http.get(Config.ENV.DOMAIN_BACKEND_URL + '/features')
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
    $log.log('backendOnline testing...');
    bind.status = false;
    $http({url: Config.ENV.DOMAIN_BACKEND_URL + '/', method: 'get', headers: {'Content-Type': 'application/json'}}).then(function (response) {
      if (response.status === 200) {
        bind.status = true;
      } else {
        bind.status = false;
      }
    }.bind(this)).then($timeout(function () {
      $rootScope.backendOnline = bind.status;
      $rootScope.backendLabelTest = (bind.status ? 'OK' : 'Fail');
    }.bind(this), 5000));
  };
});
