'use strict';
angular.module('main')
.controller('HemogramaCtrl', function ($log, $scope, $filter) {

  $log.log('Hello from your Controller: HemogramaCtrl in module main:. This is your controller:', this);
  var bind = this;
  //recupera todos os resultados referentes ao mesmo item. ex: HEM{}
  
  (function init () {
  	
  })();

  bind.siglasGeral = ['HEM', 'HB'];
  bind.registro = null;
  bind.registros = [
   {'id':'1', 'data': '10/01/2016', 'sigla': bind.siglasGeral[1], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'2', 'data': '10/02/2016', 'sigla': bind.siglasGeral[0], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '18/02/2016', 'sigla': bind.siglasGeral[1], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '19/02/2016', 'sigla': bind.siglasGeral[0], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '12/02/2016', 'sigla': bind.siglasGeral[1], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '18/03/2016', 'sigla': bind.siglasGeral[0], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '19/04/2016', 'sigla': bind.siglasGeral[1], 'value': Math.floor((Math.random()*99)+1)},
   {'id':'3', 'data': '01/06/2016', 'sigla': bind.siglasGeral[1], 'value': Math.floor((Math.random()*99)+1)}
  ];
  bind.hemogramas = unique(bind.registros, 'id');
  bind.datas = function () {
  	return unique(bind.registros, 'data');
  }
  bind.siglas = function () {
  	return bind.siglasGeral;
  }
  bind.clean = function () {
  	bind.registro = null;
  }
  bind.add = function () {
  	bind.registros.push(bind.registro);	
  };
  bind.newMock = function () {
	var dataRandon = new Date();
	dataRandon.setDate(dataRandon.getDate() + Math.random() * 3 + 1);
	var dataRandonString = $filter('date')(dataRandon, 'dd/MM/yyyy');
	bind.registro = {
		'id': Math.floor((Math.random()*99)+1), 
		'value': Math.floor((Math.random()*59)+1) , 
		'sigla': bind.siglasGeral[Math.floor((Math.random()*2))],
		'data': dataRandonString};
  }
  bind.remove = function (indexRegistro) {
  	$log.log('remove registro ' + indexRegistro);
   	bind.registros.splice(indexRegistro, 1);
  }
  var countSiglas = 0;
  bind.render = [];
  var countRender = 0;
  // a cada sigla chamo este método
  // para recuperar os seus item por sigla e data
  bind.tests = function (sigla) {
  	//return
  	//controle de sigla
  	if (countSiglas <= bind.siglas().length - 1){
  	  var tmp = [];
  	  $log.log('tests', sigla);
  	  
        var hasRegistry;
		for (var k = 0; k <= bind.datas().length - 1; k++) {
            hasRegistry = false;
			for (var i = 0; i <= bind.registros.length - 1; i++) {
				if (bind.registros[i].sigla === sigla
				  		&& bind.registros[i].data === bind.datas()[k].data) {
					$log.info('push', bind.registros[i]);
					tmp.push(bind.registros[i]);
				    hasRegistry = true;
				}
			}
			if (!hasRegistry){
		      var vazio = {'id': Math.floor((Math.random()*99)+1), 'value': '-'};
		      tmp.push(vazio);
		    }
		}
		$log.log('current tmp',tmp);
		var itemRender = [];
		for (var t = 0; t <= tmp.length - 1; t++) {
		  itemRender.push(tmp[t]);
		}
		bind.render[countRender] = itemRender;
		$log.log('current itemRender',itemRender);
		countRender++;
		countSiglas++;
		$log.log('render ', bind.render);
		return tmp;
    }
    
    
  };
  
  bind.listItems = function (sigla) {
 	var tmp = [];
  	var hasRegistry = false;

  	if (countSiglas <= bind.siglas().length - 1){
      $log.log('sigla', sigla);

	  for (var k = 0; k <= bind.hemogramas.length - 1; k++) {
		if(bind.hemogramas[k].sigla === sigla) {
            for (var i = 0 ; i<= bind.datas().length - 1; i++) {
		 	 
		 	  if (bind.hemogramas[k].data === bind.datas()[i].data){
		 	  	$log.log('push:', bind.hemogramas[k]);
		 	  	$log.log('tmp befor: ', tmp);
		 	  	tmp.push(JSON.stringify(bind.hemogramas[k]));
		 	  	$log.log('tmp after: ', tmp);
		 	  	hasRegistry = true;
	  	        $log.info('added:', bind.hemogramas[k].sigla +' - '+ bind.hemogramas[k].data);
		 	  }else{
		 	  	 $log.log('no match', bind.datas()[i].data);
		 	  }
		 	}
	    }
	  }
	  if (!hasRegistry){
	    var vazio = {'id': Math.floor((Math.random()*99)+1), 'value': 'vazio'};
	    tmp.push(vazio);
	  }
	  countSiglas++;
	  $log.log('return: ', tmp);

	  return tmp;
    }
  }

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
