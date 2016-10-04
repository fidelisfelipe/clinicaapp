'use strict';
angular.module('main')
.controller('TabelaCtrl', function ($log, $rootScope, $state, $stateParams, FlashService) {

  $log.log('Hello from your Controller: TabelaCtrl in module main:. This is your controller:', this);
  var bind = this;
  bind.novo = $stateParams.tabelaId? tabelaPorId($stateParams.tabelaId) : null;

  $rootScope.tabelas = [{'id': 1, 'nome': 'Hemograma'},
                  {'id': 2, 'nome': 'EAS'},
                  {'id': 3, 'nome': 'Dosagens Hormonais'},
                  {'id': 4, 'nome': 'Lipidogramas'},
                  {'id': 5, 'nome': 'Parametros de Acompanhamento do HIV'},
                  {'id': 6, 'nome': 'Parasitológico'},
                  {'id': 7, 'nome': 'Bioquímica'},
                  {'id': 8, 'nome': 'Provas de Função Hepática'},
                  {'id': 9, 'nome': 'Exames Diretos e Culturas'},
                  {'id': 10, 'nome': 'Especialidades'},
                  {'id': 11, 'nome': 'Raio X'},
                  {'id': 12, 'nome': 'Eletrocardiogramas'}];

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
  	$log.log('remove item', $rootScope.tabelas);
	for (var i = 0; i < $rootScope.tabelas.length; i++) { 
      var compareId = id + '';
      var compareIdList = $rootScope.tabelas[i].id + '';

      if (compareId === compareIdList) {
        var index = $rootScope.tabelas.indexOf($rootScope.tabelas[i]);
        $rootScope.tabelas.splice(index, 1);
        return true;
      }
    };
    return false;
  }

  function msgSucesso() {
  	FlashService.Success('Operação realizada com sucesso');
  	$state.go('main.tabelaSearch');
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
    $rootScope.tabelas.push(novo);
  }
  function editSave (edit) {
    for (var i = 0; i < $rootScope.tabelas.length; i++) {
      if ($rootScope.tabelas[i].id === edit.id) {
        $rootScope.tabelas[i] = edit;
        return true;
      }
    }
    return false;
  }
  function tabelaPorId(id) {
  	$log.log('get tabela list', $rootScope.tabelas);
	for (var i = 0; i < $rootScope.tabelas.length; i++) { 
      var compareId = id + '';
      var compareIdList = $rootScope.tabelas[i].id + '';

      $log.log('compare '+compareId+' === '+compareIdList+'? ', compareId === compareIdList);

      if (compareId === compareIdList) {
        $log.log('get tabela: ', $rootScope.tabelas[i]);
        return $rootScope.tabelas[i];
      }
    };
    $log.log('get tabela not found: ', id);
  }
});

