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
    getExamesPaciente: function (id, callback, fail) {
      $log.log('init get exames por paciente one...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/tipoexames/por/paciente/'+id
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
    }
  };

  function castDateForBackend (data) {
    return $filter('date')(data,"yyyy-MM-dd'T'HH:mm:ssZ");
  }

  return DataService;
});
