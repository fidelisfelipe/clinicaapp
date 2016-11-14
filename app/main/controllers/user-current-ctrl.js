'use strict';
angular.module('main')
.controller('UserCurrentCtrl', function ($log, $rootScope, DataService, UtilService, FlashService) {

  $log.log('Hello from your Controller: UserCurrentCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.userCurrent = UtilService.getUserCurrentLocal();
  bind.edit = function (form) {
    if (form.$valid) {
      FlashService.Question('Alterar dados do registro?', 
        function () {
          DataService.editLogin(bind.userCurrent,
            function () {
            	FlashService.Loading('Atualizando registro...', true);
                DataService.getLogin(bind.userCurrent.id, 
                  function (result) {
                    bind.userCurrent = result;
                    $rootScope.userCurrent.nome = bind.userCurrent.nome;
                    FlashService.Loading(false);
                    FlashService.Success('Registro Atualizado com Sucesso!');
                  }, function (msgError) {
                  	FlashService.Loading(false);
                    FlashService.Error(msgError);
                  });
                refreshList();
            }, function (erroMsg) {
              FlashService.Loading(false);
              FlashService.Error(erroMsg);
            });
        });
    } else {
      return false;
    }

  };
});
