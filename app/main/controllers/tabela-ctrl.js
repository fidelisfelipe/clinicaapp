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
  bind.add = function () {
  	FlashService.Question('Incluir novo registro?', msgSucesso);
  	bind.addSave(bind.novo);
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

