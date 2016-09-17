'use strict';
angular.module('main')
.controller('HemogramaFormCtrl', function ($log, $scope, $filter, $rootScope, Main) {

  $log.log('Hello from your Controller: HemogramaFormCtrl in module main:. This is your controller:', this);
  var bind = this;
//  (function init () {
    bind.registros = Main.registros();
    bind.siglasGeral = Main.siglasGeral();
    bind.siglas = Main.siglas();
    bind.datas = Main.datas();
    bind.render = Main.render();
//  })();
  //new mock
  bind.newMock = function () {
    var dataRandon = new Date();
    dataRandon.setDate(dataRandon.getDate() + Math.random() * 3 + 1);
    bind.registro = {
      'id': Math.floor((Math.random()*99)+1), 
      'value': Math.floor((Math.random()*59)+1) , 
      'sigla': bind.siglasGeral[Math.floor((Math.random()*2))],
      'dataInput': dataRandon};
  }

  //add
  bind.add = function () {
    bind.registro.data = bind.registro.dataInput;
    Main.registrosAdd(bind.registro);
  };
  //remove
  bind.remove = function (indexRegistro) {
    $log.log('remove registro ' + indexRegistro);
    bind.registros.splice(indexRegistro, 1);
  };

  var countSiglas = 0;
  var countRender = 0;
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

});
