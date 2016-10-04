'use strict';
angular.module('main')
.controller('ItemCtrl', function ($log, $rootScope, $state, $stateParams, FlashService) {

  $log.log('Hello from your Controller: ItemCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.itemId? itemPorId($stateParams.itemId) : null;

  $rootScope.itens = [{'id': 1, 'sigla': 'HEM', 'nome': 'Hemáceas'},
                  {'id': 2, 'sigla': 'HB', 'nome': 'Hemoglobina'},
                  {'id': 3, 'sigla': 'HCT', 'nome': 'Hemoglobina Cetônicos'}];

  bind.add = function () {
  	FlashService.Question('Incluir novo registro?', msgSucesso);
  	bind.addSave(bind.novo);
  }
  bind.remove = function () {
  	FlashService.Question('Deseja remover este registro?', function () {
  	  var removed = remove(bind.novo.id);
  	  $log.log('index remove: ', removed);
      if (removed) {
        msgSucesso();
      } else {
        msgErro();
      }
    });
  }

  function remove (id) {
  	$log.log('remove item', $rootScope.itens);
	for (var i = 0; i < $rootScope.itens.length; i++) { 
      var compareId = id + '';
      var compareIdList = $rootScope.itens[i].id + '';

      if (compareId === compareIdList) {
        var index = $rootScope.itens.indexOf($rootScope.itens[i]);
        $rootScope.itens.splice(index, 1);
        return true;
      }
    };
    return false;
  }

  function msgSucesso() {
  	FlashService.Success('Operação realizada com sucesso');
  	$state.go('main.itemSearch');
  }

  function msgErro() {
    FlashService.Error('Não foi possivel editar o registro...');
  }

  bind.edit = function () {
    FlashService.Question('Alterar dados do registro?', function () {
      if (editSave(bind.novo)) {
        msgSucesso();
      } else {
        msgErro();
      }
    });
  }

  bind.addSave = function (novo) {
    novo.id = Math.floor((Math.random()*999)+3);
    $rootScope.itens.push(novo);
  }
  function editSave (edit) {
    for (var i = 0; i < $rootScope.itens.length; i++) {
      if ($rootScope.itens[i].id === edit.id) {
        $rootScope.itens[i] = edit;
        return true;
      }
    }
    return false;
  }
  function itemPorId(id) {
  	$log.log('get item list', $rootScope.itens);
	for (var i = 0; i < $rootScope.itens.length; i++) { 
      var compareId = id + '';
      var compareIdList = $rootScope.itens[i].id + '';

      $log.log('compare '+compareId+' === '+compareIdList+'? ', compareId === compareIdList);

      if (compareId === compareIdList) {
        $log.log('get item: ', $rootScope.itens[i]);
        return $rootScope.itens[i];
      }
    };
    $log.log('get item not found: ', id);
  }
});

