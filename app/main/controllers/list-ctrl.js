'use strict';
angular.module('main')
.controller('ListCtrl', function ($log, FlashService) {

  $log.log('Hello from your Controller: ListCtrl in module main:. This is your controller:', this);

  this.selected = function () {
    FlashService.Question('Selecionar este?', selectedItem);
  };
  function selectedItem () {
    FlashService.Success('Selecionado com sucesso!');
  }
});
