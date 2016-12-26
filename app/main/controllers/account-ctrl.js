'use strict';
angular.module('main')
.controller('AccountCtrl', function ($log, $rootScope,$state, Main, LoginService, UtilService, FlashService) {

  $log.log('Account.controller');
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();
  bind.openFormEdit = function () {
    FlashService.FormEdit();
  }
  bind.edit = function (form) {
    if (form.$valid) {
      if(!bind.userCurrent.nome){
        FlashService.Error('Nome é Obrigatório!');
        return false;
      }
      FlashService.Question('Alterar dados do registro?', 
        function () {
          LoginService.LoginEdit(bind.userCurrent, function () {
            bind.userCurrent = UtilService.getUserCurrentLocal();
            FlashService.Success("Operação Realizada com Sucesso!");
            $state.go('main.account');
          }, function () {
              FlashService.Error('Não foi possível realizar a operação!');
          });
        });
    } else {
      return false;
    }

  }
});
