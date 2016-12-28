'use strict';
angular.module('main')
.controller('LoginCtrl', function ($scope, $ionicModal, $ionicSideMenuDelegate, $ionicHistory, $log, $rootScope, $state, Main, LoginService, FlashService, UtilService) {
  $log.log('Login.controller');
  componentHandler.upgradeDom();

  var bind = this;

  (function init () {
    //userCurrentClean();
    verifySaveUser();
  })();

  $ionicHistory.nextViewOptions({
    disableAnimate: true,
    disableBack: true
  });

  $ionicSideMenuDelegate.canDragContent(false);
  
  bind.login = function (form) {
  	if (form.$valid) {
      FlashService.Loading(true, 'Realizando Login...');
      LoginService.Login(bind.userCurrent ,
      	function(){
          FlashService.Loading(false);
      		FlashService.Success('Login efetuado com sucesso!');
      		$state.go('main.home');
      	},
      	function(erroMsg){
      		FlashService.Error(erroMsg);
      	});
      }
  }
  bind.logout = function () {
    FlashService.Question('Deseja realmente sair do sistema?',
    function () {
      FlashService.Loading(true, 'Realizando Logout...');
      LoginService.Logout(
        function(){
          bind.userCurrent = null;
          $state.go('main.login');
        },
        function(){
          FlashService.Error('Falha ao realizar Logout!');
        });
      FlashService.Loading(false);
    });
  }
  function verifySaveUser(){
    bind.userCurrent = JSON.parse(UtilService.verifySaveUser());
    $log.debug('Login.controller: user find for login...');
  }
  function userCurrentClean(){
    $log.log('user current clean...');
    bind.userCurrent = null;
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
  
  bind.openModal = function() {
    userCurrentClean();
    $ionicModal.fromTemplateUrl('signin.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      bind.modal = modal;
      bind.modal.show();
    });
    
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
