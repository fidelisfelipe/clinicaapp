'use strict';
angular.module('main')
.service('Main', function ($log, $timeout, $http, $rootScope, Config) {
  var bind = this;
//TODO: move for Util
  function getDataRandon () {
    var dataRandon = new Date();
    dataRandon.setDate(dataRandon.getDate() - Math.random() * 30000 + 1);
    return dataRandon;
  }
  function getTelefoneRandon(){
    var telefoneRandon = Math.floor((Math.random()*6199999999)+1);
    return telefoneRandon;
  }
  $rootScope.render = [];
  $rootScope.estadoCivilList = ['Solteiro','Casado','Divorciado'];
  $rootScope.sexoList = ['Masculino','Feminino'];
  this.siglasGeral = function () {return ['HEM', 'HB', 'HCL'];}
  $rootScope.pacientes = [{'id': Math.floor((Math.random()*999)+3), 
                           'nome': 'John',
                           'responsavel': 'John Resp.',
                           'dataNascimento': getDataRandon(),
                           'telefone': getTelefoneRandon(),
                           'sexo': $rootScope.sexoList[Math.floor((Math.random()*1))],
                           'estadoCivil': $rootScope.estadoCivilList[Math.floor((Math.random()*2))],
                           'naturalidade': 'Belo Horizonte - MG',
                           'profissao': 'Estudante'},
                          {'id': Math.floor((Math.random()*999)+3), 
                           'nome': 'Bob',
                           'responsavel': 'Bob Resp.',
                           'dataNascimento': getDataRandon(),
                           'telefone': getTelefoneRandon(),
                           'sexo': $rootScope.sexoList[Math.floor((Math.random()*1))],
                           'estadoCivil': $rootScope.estadoCivilList[Math.floor((Math.random()*2))],
                           'naturalidade': 'Goiânia - GO',
                           'profissao': 'Médico'},
                          {'id': Math.floor((Math.random()*999)+3), 
                           'nome': 'Thevis',
                           'responsavel': 'Thevis Resp.',
                           'dataNascimento': getDataRandon(),
                           'telefone': getTelefoneRandon(),
                           'sexo': $rootScope.sexoList[Math.floor((Math.random()*1))],
                           'estadoCivil': $rootScope.estadoCivilList[Math.floor((Math.random()*2))],
                           'naturalidade': 'Natal - RN',
                           'profissao': 'Mecânico'},
                          {'id': Math.floor((Math.random()*999)+3), 
                           'nome': 'Toddy',
                           'responsavel': 'Toddy Resp.',
                           'dataNascimento': getDataRandon(),
                           'telefone': getTelefoneRandon(),
                           'sexo': $rootScope.sexoList[Math.floor((Math.random()*1))],
                           'estadoCivil': $rootScope.estadoCivilList[Math.floor((Math.random()*2))],
                           'naturalidade': 'Manaus - AM',
                           'profissao': 'Engenheiro'},
                          {'id': Math.floor((Math.random()*999)+3), 
                           'nome': 'Bily',
                           'responsavel': 'Bily Resp.',
                           'dataNascimento': getDataRandon(),
                           'telefone': getTelefoneRandon(),
                           'sexo': $rootScope.sexoList[Math.floor((Math.random()*1))],
                           'estadoCivil': $rootScope.estadoCivilList[Math.floor((Math.random()*2))],
                           'naturalidade': 'Taguatinga - TO',
                           'profissao': 'Estudante'}];
  bind.registros = [
     {'id':'1', 'data': '10/01/2016', 'sigla': bind.siglasGeral()[0], 'value': Math.floor((Math.random()*99)+1)},
     {'id':'2', 'data': '10/02/2016', 'sigla': bind.siglasGeral()[1], 'value': Math.floor((Math.random()*99)+1)},
     {'id':'3', 'data': '10/02/2016', 'sigla': bind.siglasGeral()[2], 'value': Math.floor((Math.random()*99)+1)}
     ];
  $rootScope.registros = bind.registros;

  $log.log('Hello from your Service: Main in module main');

  this.addPaciente = function (novo) {
    novo.id = Math.floor((Math.random()*999)+3);
    $rootScope.pacientes.push(novo);
  }
  this.editPaciente = function (registro) {
    for (var i = 0; i < $rootScope.pacientes.length; i++) {
      if ($rootScope.pacientes[i].id === registro.id) {
        $rootScope.pacientes[i] = registro;
        return true;
      }
    };
    return false;
  }

  this.getPaciente = function (pacienteId) {
    for (var i = 0; i < $rootScope.pacientes.length; i++) { 
      var compareId = pacienteId + '';
      var compareIdList = $rootScope.pacientes[i].id + '';

      $log.log('compare '+compareId+' === '+compareIdList+'? ', compareId === compareIdList);

      if (compareId === compareIdList) {
        $log.log('get paciente: ', $rootScope.pacientes[i]);
        return $rootScope.pacientes[i];
      }
    };
    $log.log('get paciente not found: ', pacienteId);
  }

  this.render = function () {
    return $rootScope.render;
  };

  //registros
  this.registrosAdd = function (registro) {
    if (registro.sigla && registro.data && registro.value) {
      $log.log('added: ', registro);
      registro.id = Math.floor((Math.random()*99)+1);//TODO: Remover qnd colocar o backend
      $rootScope.registros.push(registro);
    }
  }

  this.registros = function () {
    return $rootScope.registros;
  };
  //siglas
  this.siglas = function () {
    var siglas = unique($rootScope.registros, 'sigla');
    $rootScope.siglas = siglas;
    return $rootScope.siglas;
  };
  //datas
  this.datas = function () {
    $rootScope.datas = unique($rootScope.registros, 'data');
    return $rootScope.datas;
  }

//Util - TODO:migration for util
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

//OLD REFS REST 
  this.changeBriefly = function () {
    var initialValue = this.someData.binding;
    this.someData.binding = 'Yeah Service Working!';
    var that = this;
    $timeout(function () {
      that.someData.binding = initialValue;
    }, 500);
  };

  this.features = function (callback, fail) {
    $http.get(Config.ENV.DOMAIN_BACKEND_URL + '/features')
    .then(function (response) {
      if (response.status === 200) {
        callback(response.data.features);
      } else {
        fail();
      }
    }.bind(this))
      .then($timeout(function () {
      }.bind(this), 6000));
  };

  this.backendOnline = function () {
    $log.log('backendOnline testing...');
    bind.status = false;
    $http({url: Config.ENV.DOMAIN_BACKEND_URL + '/', method: 'get', headers: {'Content-Type': 'application/json'}}).then(function (response) {
      if (response.status === 200) {
        bind.status = true;
      } else {
        bind.status = false;
      }
    }.bind(this)).then($timeout(function () {
      $rootScope.backendOnline = bind.status;
      $rootScope.backendLabelTest = (bind.status ? 'OK' : 'Fail');
    }.bind(this), 5000));
  };
});
