'use strict';
angular.module('main')
.controller('LoginCtrl', function ($ionicSideMenuDelegate, $ionicViewService, $log, $rootScope, $state, Main, LoginService, FlashService, UtilService) {

  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);
  var bind = this;
  
  (function init () {
  	bind.userCurrent = UtilService.getUserCurrentTest();
  })();

  $ionicViewService.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });
  $ionicSideMenuDelegate.canDragContent(false);
  bind.login = function (form) {
	if (form.$valid) {
    	FlashService.Question('Deseja entrar no sistema?', 
        function () {
          FlashService.Loading(true, 'Realizando Login...');
          LoginService.Login(bind.userCurrent, 
          	function(){
          		FlashService.Success('Login efetuado com sucesso!');
          		$state.go('main.home');
          	}, 
          	function(){
          		FlashService.Error('Credenciais Inválidas!');
          	});
          FlashService.Loading(false);
        });
    }
  }
  function msgErro() {
    FlashService.Error('Não foi possivel efetuar seu login...');
  }
  function msgSucesso() {
  	FlashService.Success('Login realizado com sucesso!');
  	$state.go('main.home');
  }

});
