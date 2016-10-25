'use strict';
angular.module('main')
.service('LoginService', function ($log, $filter, $timeout, $http, $rootScope, Config) {
  $log.log('Hello from your Service: LoginService in module main');
  var bind = this;
  this.proxyState = '';
  $rootScope.usuarioWeb = {isLogado: false};
  this.getLogin = $rootScope.usuarioWeb;

  this.Logout = function (callback, fail) {
    $log.log('init logout...');
    //$rootScope.exames.push(novo);
    this.proxyState = '...';
    $http({
      method: 'POST',
      data: '{token:"TOKENFAKE"}',
      url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios/logout'
    })
    .then(function (response) {
      $log.log('logout success!');
      this.proxyState = 'success (result printed to browser console)';
      $log.log('status request:', response.status);
      if (response.status === 200) {
        //set usuario logado
        $rootScope.usuarioWeb.isLogado = false;
        $rootScope.appStatusView = 'Usuário não está logado';
        callback();
      } else {
        fail();
      }
      
    }.bind(this))
    .then($timeout(function () {
      this.proxyState = 'ready';
      $log.log('end exame add request...');
    }.bind(this), 6000));
  }

  this.Login = function (usuarioWeb, callback, fail) {
    $log.log('init login...');
    //$rootScope.exames.push(novo);
    this.proxyState = '...';
    $http({
      method: 'POST',
      data: JSON.stringify(usuarioWeb),
      url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios/login'
    })
    .then(function (response) {
      $log.log('login success!');
      this.proxyState = 'success (result printed to browser console)';
      $log.log('status request:', response.status);
      if (response.status === 200) {
        //set usuario logado
        $rootScope.usuarioWeb.isLogado = true;
        $rootScope.usuarioWeb.nome = 'Usuário Test';
        $rootScope.appStatusView = 'Bem vindo '+$rootScope.usuarioWeb.nome;
        callback();
      } else {
        fail();
      }
      
    }.bind(this))
    .then($timeout(function () {
      this.proxyState = 'ready';
      $log.log('end exame add request...');
    }.bind(this), 6000));
  }

});
