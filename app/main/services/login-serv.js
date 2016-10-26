'use strict';
angular.module('main')
.service('LoginService', function ($log, $filter, $timeout, $http, $rootScope, Config, UtilService) {
  $log.log('Hello from your Service: LoginService in module main');
  var bind = this;

  this.Logout = function (callback, fail) {
    $log.log('init logout...');

    $http({
      method: 'POST',
      data: '{token:"TOKENFAKE"}',
      url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios/logout'
    })
    .then(function (response) {
      $log.log('logout success!');
      $log.log('logout request:', response.status);
      if (response.status === 200) {
        //set usuario logado
        $rootScope.status = 'Usuário não está logado';
        UtilService.setNotAuthorized();
        UtilService.refreshUserCurrentRoot();
        callback();
      } else {
        fail();
      }
      
    }.bind(this))
    .then($timeout(function () {

      $log.log('end logout request...');
    }.bind(this), 6000));
  }

  this.Login = function (usuarioWeb, callback, fail) {
    $log.log('init login...', usuarioWeb.email);
    //$rootScope.exames.push(novo);
    $http({
      method: 'POST',
      data: JSON.stringify(usuarioWeb),
      url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios/login'
    })
    .then(function (response) {
      $log.log('login success!');
      $log.log('login request:', response.status);
      if (response.status === 200) {
        usuarioWeb.nome = 'Usuário Test';
        var user = UtilService.getUserCurrentTest();
        user.email = usuarioWeb.email;
        user.isAuthorized = true;
        user.isLogado = true;
        user.name = usuarioWeb.nome;
        user.nome = usuarioWeb.nome;

        UtilService.setUserCurrent(user);
        UtilService.refreshUserCurrentRoot();

    		if(user.isAuthorized){
    			$log.info('success login!');
    		} else{
    			$log.warn('fail login!');
    		}
		
        callback();
      } else {
        fail();
      }
    }.bind(this))
    .then($timeout(function () {
      $log.log('end login request...');
    }.bind(this), 6000));
  }

});
