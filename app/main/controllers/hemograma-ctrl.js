'use strict';
angular.module('main')
.controller('HemogramaCtrl', function ($log, $scope, $filter, $rootScope,$state, Main) {

  $log.log('Hello from your Controller: HemogramaCtrl in module main:. This is your controller:', this);
  var bind = this;
  //recupera todos os resultados referentes ao mesmo item. ex: HEM{}

//  (function init () {
    bind.registro = null;

    bind.siglasGeral = Main.siglasGeral();
    bind.registros = Main.registros();
    bind.datas = Main.datas();
    bind.siglas = Main.siglas();
    bind.render = Main.render();
    bind.form = function () {$state.go('main.hemogramaAdd');};
//  })();

  bind.clean = function () {
    $log.log('clean registro...');
  	bind.registro = null;
  }
  bind.refresh = function () {
  $log.log('refresh...');
      //refresh tables
    for (var i = 0; i < bind.siglas.length; i++) {
      bind.tests(bind.siglas[i].sigla);
    };
  }
  bind.cleanList = function () {
    $log.log('clean bind.registros...');
    $log.log('clean bind.render...');
    $log.log('clean $rootScope.render...');

    $rootScope.render = [];
    bind.render = [];
    bind.registros = [];
  }
  bind.add = function () {
    //gera id em test mas é ignorado pelo backend
    //backend gerará uma chave segura
  	bind.registro.id = Math.floor((Math.random()*99)+1);//TODO: deve ser removido
  	bind.registro.data = bind.registro.dataInput;
    bind.registros.push(bind.registro);
    $log.log('add:', bind.registro); 
    for (var i = 0; i < bind.siglas.length; i++) {
      bind.tests(bind.siglas[i].sigla);
    };
  };
  bind.newMock = function () {
  	var dataRandon = new Date();
  	dataRandon.setDate(dataRandon.getDate() + Math.random() * 3 + 1);
  	bind.registro = {
  		'id': Math.floor((Math.random()*99)+1), 
  		'value': Math.floor((Math.random()*59)+1) , 
  		'sigla': bind.siglasGeral[Math.floor((Math.random()*2))],
  		'dataInput': dataRandon};
  }
  bind.remove = function (indexRegistro) {
  	$log.log('remove registro ' + indexRegistro);
   	bind.registros.splice(indexRegistro, 1);
  }
  var countSiglas = 0;
  var countRender = 0;
  // a cada sigla chamo este método
  // para recuperar os seus item por sigla e data
  $rootScope.tests = function (sigla) {return bind.tests(sigla);}
  bind.tests = function (sigla) {
  	//return
  	//controle de sigla
  	if (countSiglas <= bind.siglas.length - 1){
  	  var tmp = [];
  	  $log.log('tests', sigla);
  	  
        var hasRegistry;
        //percorro cada data para recuperar todas as datas desta sigla
		for (var k = 0; k <= bind.datas.length - 1; k++) {
            hasRegistry = false;
			for (var i = 0; i <= bind.registros.length - 1; i++) {
				if (bind.registros[i].sigla === sigla
				  		&& bind.registros[i].data === bind.datas[k].data) {
					$log.info('push', bind.registros[i]);
					tmp.push(bind.registros[i]);
				    hasRegistry = true;
				}
			}
			//se a data e sigla não possui valor, a coluna fica vazia
			if (!hasRegistry){
		      var vazio = {'id': Math.floor((Math.random()*99)+1), 'value': '-'};
		      tmp.push(vazio);
		    }
		}

		var itemRender = [];
		for (var t = 0; t <= tmp.length - 1; t++) {
		  itemRender.push(tmp[t]);
		}
		bind.render[countRender] = itemRender;

		countRender++;
		countSiglas++;
		$log.log('render ', bind.render);
		return tmp;
    }
  };

  function unique(input, key) {
    var unique = {};
    var uniqueList = [];
    for (var i = 0; i < input.length; i++) {
      if (typeof unique[input[i][key]] === 'undefined') {
        unique[input[i][key]] = '';
        uniqueList.push(input[i]);
      }
    }
    return uniqueList;
  };
});
