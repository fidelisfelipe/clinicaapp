'use strict';
angular.module('main')
.service('DataService', function ($filter, $log, $rootScope, $http, Config) {

  var DataService = {
    getPacienteList: function (callback, fail) {
      $log.log('init get pacientes all...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get pacientes all success!');
        $log.log('get pacientes all - status:', response.status);
        if (response.status === 200) {
          callback(response.data.pacienteList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get pacientes fail response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getPaciente: function (id, callback, fail) {
      $log.log('init get paciente one...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/'+id
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get paciente one success!');
        $log.log('get paciente one - status:', response.status);
        if (response.status === 200) {
           //init converte date util for input date
            var paciente = response.data.paciente;
            paciente.dataNascimento = new Date(paciente.dataNascimento);
            //end converte date util for input date
            callback(paciente);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get paciente one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    editPaciente: function (paciente, callback, fail) {
      paciente.dataNascimento = castDateForBackend(paciente.dataNascimento);
      $log.log('init edit paciente...');
      $http({
        method: 'POST',
        data: JSON.stringify(paciente),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get paciente one success!');
        $log.log('get paciente one - status:', response.status);
        if (response.status === 200) {
            callback();
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get paciente one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    resultadoAdd: function (pacienteId, resultado, callback, fail) {
      //cast date for backend
      resultado.data = castDateForBackend(resultado.data);
      $log.log('init add resultado...');
      $http({
        method: 'POST',
        data: '{resultado: '+JSON.stringify(resultado)+', paciente: {id: '+JSON.stringify(pacienteId)+'}}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/resultado/add'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('add resultado success!');
        $log.log('add resultado - status:', response.status);
        if (response.status === 200) {
            callback();
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('add resultado response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    resultadoRemove: function (pacienteId, resultado, callback, fail) {
      //cast date for backend
      resultado.data = castDateForBackend(resultado.data);
      $log.log('init add resultado...');
      $http({
        method: 'POST',
        data: '{resultado: '+JSON.stringify(resultado)+', paciente: {id: '+JSON.stringify(pacienteId)+'}}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/resultado/remove'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('add resultado success!');
        $log.log('add resultado - status:', response.status);
        if (response.status === 200) {
            callback();
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('add resultado response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getExamesPaciente: function (object, callback, fail) {
      $log.log('init get exames por paciente one...');
      $http({
        method: 'GET',
        data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/tipoExameList'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get exames por paciente one success!');
        $log.log('get exames por paciente one - status:', response.status);
        if (response.status === 200) {
            callback(response.data.tipoExameList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get exames por paciente one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getExamesPorPacientePorTipo: function (pacienteId, tipoExameId, callback, fail) {
      $log.log('init get exames por paciente por tipo de exame one...');
      $http({
        method: 'POST',
        data: '{pacienteId:'+JSON.stringify(pacienteId)+', tipoExameId: '+JSON.stringify(tipoExameId)+'}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/exameList/por/paciente/por/tipoExame'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get exames por paciente por tipo de exame one success!');
        $log.log('get exames por paciente por tipo de exame one - status:', response.status);
        if (response.status === 200) {
            callback(response.data.exameList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get exames por paciente por tipo de exame one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getTipoExame: function (id, callback, fail) {
      $log.log('init get tipoExame one...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/tipoexames/'+id
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get tipoExame one success!');
        $log.log('get tipoExame one - status:', response.status);
        if (response.status === 200) {
           //init converte date util for input date
            var tipoExame = response.data.tipoExame;
            tipoExame.data = new Date(tipoExame.data);
            //end converte date util for input date

            callback(tipoExame);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get tipoExame one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getExameList: function (callback, fail) {
      $log.log('init get exame all...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/exames'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get exame all success!');
        $log.log('get exame all - status:', response.status);
        if (response.status === 200) {
           //init converte date util for input date
            var exameList = response.data.exameList;
            //end converte date util for input date
            callback(exameList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get exame all response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getTipoExameList: function (callback, fail) {
      $log.log('init get tipoExame all...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/tipoexames'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get tipoExame all success!');
        $log.log('get tipoExame all - status:', response.status);
        if (response.status === 200) {

           //init converte date util for input date
            var tipoExameList = response.data.tipoExameList;

            //tipoExame.data = new Date(tipoExame.data);
            //end converte date util for input date

            callback(tipoExameList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');

         }else{
           $log.warn('get tipoExame one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getResultadoExameList: function (pacienteId, tipoExameId, callback, fail) {
      $log.log('init get resultado exame one...');
      $http({
        method: 'POST',
        data: '{pacienteId:'+JSON.stringify(pacienteId)+', tipoExameId:'+ JSON.stringify(tipoExameId)+'}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/resultados/por/tipoExame'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get resultado one success!');
        $log.log('get resultado one - status:', response.status);
        if (response.status === 200) {
            //end converte date util for input date
            callback(response.data.resultadoExameList);
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Usuário não autorizado!');
         }else{
           $log.warn('get resultado one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    }
  };

  function castDateForBackend (data) {
    return $filter('date')(data,"yyyy-MM-dd'T'HH:mm:ssZ");
  }

  return DataService;
});
