'use strict';
angular.module('main')
.service('DataService', function ($filter, $log, $state, $rootScope, $http, UtilService, Config) {
  $log.log('Data.service');
  init();

  var bind = this;

  function init(){
    $log.log('Data.init');
  }

  var DataService = { 
    prepareRoot: function(){
      $log.info("DataService.prepareRoot init");
      bind.user = UtilService.verifySaveUser();

      if(bind.user === null){
        UtilService.setUserCurrentBlank();
        UtilService.refreshUserCurrentRoot();
        bind.user = UtilService.getUserCurrentLocal();
        $log.info('DataService.userCurrent blank defined!');
      }else{
        $log.info('user save apply: ', bind.user);
      }
      $log.info("DataService.prepareRoot finish");
    },
    prepareModule: function(){
      $log.info("prepareModule init");
      //check redirect where isauthorized
      if(bind.user !== null 
        && bind.user.isAuthorized){
        $log.info('You is Authorized');
        $state.go('main.home');
      }else{
          $log.warn('You not is Authorized');
          $state.go('main.login');
      }
      $log.info("prepareModule finish");
    },
    preparePlatform: function(){
        if(ionic.Platform.isWebView()){
          $log.info("preparePlatform init web view");
        } else if(ionic.Platform.isAndroid()){
          $log.info("preparePlatform init android");
        } else {
          $log.error("preparePlatform init - Platform not defined");
        }
    },
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
    getSiglaAllList: function (tipoExameId, callback, fail) {
      $log.log('init get sigla all...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/exames/siglaalllist/por/tipoexame/'+tipoExameId
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get sigla all success!');
        $log.log('get sigla all - status:', response.status);
        if (response.status === 200) {
          callback(response.data.siglaAllList);
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
           $log.warn('get sigla all fail response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    getExameAssociadoList: function (tipoExameId, callback, fail) {
      $log.log('init get exames associados ao tipo list...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/exames/por/tipo/'+tipoExameId
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get exames associados ao tipo list success!');
        $log.log('get exames associados ao tipo list - status:', response.status);
        if (response.status === 200) {
           //init converte date util for input date
            var exameAssociadoList = response.data.exameAssociadoList;
            //end converte date util for input date
            callback(exameAssociadoList);
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
           $log.warn('get exames associados ao tipo list response: ', response);
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
    resultadoAdd: function (pacienteId, resultado, clearValue, callback, fail) {
      //cast date for backend
      resultado.data = castDateForBackend(resultado.data);
      $log.log('init add resultado...');
      $http({
        method: 'POST',
        data: '{resultado: '+JSON.stringify(resultado)+', paciente: {id: '+JSON.stringify(pacienteId)+'}, clearValue: true}',
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
         } else if(response.status === 406){
           
         }else{
           $log.warn('add resultado response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    
    updateData: function (pacienteId, resultado, old, callback, fail) {
        //cast date for backend
    	resultado.data = castDateForBackend(resultado.data);
    	old = castDateForBackend(old);
        $log.log('init update all data...');
        $http({
          method: 'POST',
          data: '{resultado: '+JSON.stringify(resultado)+', paciente: {id: '+JSON.stringify(pacienteId)+'}, old: '+JSON.stringify(old)+'}',
          url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/dataExame/update'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $log.log('update data success!');
          $log.log('update data status:', response.status);
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
           } else if(response.status === 406){
             
           }else{
             $log.warn('add resultado response: ', response);
             fail(response.statusText + ' - ' + response.status);
           }
        });
    },
    
    resultadoUpdate: function (pacienteId, resultado, clearValue, callback, fail) {
        //cast date for backend
        resultado.data = castDateForBackend(resultado.data);
        $log.log('init update resultado...');
        $http({
          method: 'POST',
          data: '{resultado: '+JSON.stringify(resultado)+', paciente: {id: '+JSON.stringify(pacienteId)+'}, clearValue: true}',
          url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/resultado/update'
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
           } else if(response.status === 406){
             
           }else{
             $log.warn('add resultado response: ', response);
             fail(response.statusText + ' - ' + response.status);
           }
        });
    },
    resultadoRemovePorData: function (pacienteId, data, callback, fail){
    	//cast date for backend
    	var data = castDateForBackend(data);
        $log.log('init add resultado...');
        $http({
          method: 'POST',
          data: '{data: '+JSON.stringify(data)+', paciente: {id: '+JSON.stringify(pacienteId)+'}}',
          url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/resultado/remove/por/data'
        }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          $log.log('remove for date resultado success!');
          $log.log('remove resultado - status:', response.status);
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
             $log.warn('remove resultado response: ', response);
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
	getTipoExameListPorPaciente: function (pacienteId, callback, fail) {
      $log.log('init get tipoExame all for paciente...');
      $http({
        method: 'GET',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/pacientes/tipoExameList/por/paciente/'+pacienteId
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get tipoExame all for paciente success!');
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
           $log.warn('get tipoExame all for paciente response: ', response);
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
    },
    getLogin: function (usuarioWeb, callback, fail) {
      $log.log('init get login one...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios/'+usuarioWeb.id
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get login one success!');
        $log.log('get login one - status:', response.status);
        if (response.status === 200) {
           //init converte date util for input date
            var userCurrent = response.data.userCurrent;
            userCurrent.data = new Date(userCurrent.data);
            //end converte date util for input date

            callback(userCurrent);
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
           $log.warn('get login one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
    editLogin: function (usuario, callback, fail) {
      usuario.dataNascimento = castDateForBackend(usuario.dataNascimento);
      $log.log('init edit user...');
      $http({
        method: 'POST',
        data: JSON.stringify(usuario),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/usuarios'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get user one success!');
        $log.log('get user one - status:', response.status);
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
           $log.warn('get user one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
	editAnamnese: function (anamnese, callback, fail) {
      //anamnese.atualizacao.data = castDateForBackend(Utils.getCurrentDate());//TODO: Util
	  //session = session.data;//TODO: log e auditoria
      $log.log('init edit anamnese...');
      $http({
        method: 'POST',
        data: '{anamnese:'+JSON.stringify(anamnese)+'}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/anamneses'
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get anamnese edit success!');
        $log.log('get anamnese edit - status:', response.status);
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
    addExame: function (exame, callback, fail) {
      exame.dataNascimento = castDateForBackend(exame.dataNascimento);
      $log.log('init edit exame...');
      $http({
        method: 'POST',
        data: JSON.stringify(exame),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/exames'
      }).then(function successCallback(response) {
        if (response.status === 200) {
            callback();
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Registro já existe!');
         }else{
           $log.warn('get exame one response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
	consultaAdd: function (consulta, pacienteId, callback, fail) {
      consulta.data = castDateForBackend(consulta.data);
      $log.log('init add consulta...');
      $http({
        method: 'POST',
        data: '{pacienteId:'+JSON.stringify(pacienteId)+', consulta:'+ JSON.stringify(consulta)+'}',
        url: Config.ENV.DOMAIN_BACKEND_URL + '/consultas/add'
      }).then(function successCallback(response) {
        if (response.status === 200) {
            callback();
        } else {
          fail(response.status +' - '+ response.statusText);
        }
      }, function errorCallback(response) {
         if(response.status === -1){
           fail('Servidor Indisponível!');
         } else if(response.status === 401){
           fail('Registro já existe!');
         } else if(response.status === 409){
           fail('Registro já existe!');
         }else{
           $log.warn('get consulta add response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
	getConsultaList: function (pacienteId, callback, fail) {
      $log.log('init get consulta list...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/consultas/por/paciente/'+pacienteId
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get consulta list success!');
        $log.log('get consulta list - status:', response.status);
        if (response.status === 200) {
            callback(response.data.consultaList);
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
         } else{
           $log.warn('get consulta list response: ', response);
           fail(response.statusText + ' - ' + response.status);
         }
      });
    },
	getConsulta: function (consultaId, callback, fail) {
      $log.log('init get consulta one...');
      $http({
        method: 'GET',
        //data: JSON.stringify(object),
        url: Config.ENV.DOMAIN_BACKEND_URL + '/consultas/'+consultaId
      }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available
        $log.log('get consulta one success!');
        $log.log('get consulta one - status:', response.status);
        if (response.status === 200) {
            callback(response.data.consulta);
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
         } else{
           $log.warn('get consulta one response: ', response);
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
