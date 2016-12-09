'use strict';
angular.module('main')
.controller('LoginCtrl', function ($scope, $ionicModal, $ionicSideMenuDelegate, $ionicViewService, $log, $rootScope, $state, Main, LoginService, FlashService, UtilService) {

  componentHandler.upgradeDom();

  $log.log('Hello from your Controller: LoginCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();
  (function init () {

  })();

  $ionicViewService.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });
  $ionicSideMenuDelegate.canDragContent(false);

  bind.login = function (form) {
	if (form.$valid) {

          FlashService.Loading(true, 'Realizando Login...');
          LoginService.Login(bind.userCurrent,
          	function(){
              FlashService.Loading(false);
          		FlashService.Success('Login efetuado com sucesso!');
          		$state.go('main.home');
          	},
          	function(erroMsg){
              FlashService.Loading(false);
          		FlashService.Error(erroMsg);
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
  bind.sendSign = function(form){
  	if (form.$valid) {

          FlashService.Loading(true, 'Realizando Cadastro...');
          LoginService.SignIn(bind.userCurrent,
          	function(){
          		FlashService.Success('Cadastro realizado com sucesso!');
          		$state.go('main.home');
          	},
          	function(erroMsg){
          		FlashService.Error(erroMsg);
          	});
          bind.closeModal();
          FlashService.Loading(false);

  	}
  }
  $ionicModal.fromTemplateUrl('signin.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    bind.modal = modal;
  });
  bind.openModal = function() {
    bind.modal.show();
  };
  bind.closeModal = function() {
    bind.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    bind.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  bind.signin = function () {
  	$log.log('sigin...');
  	bind.openModal();
    componentHandler.upgradeDom();
  }

});
