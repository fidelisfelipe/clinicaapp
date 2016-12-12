'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://DEVSERVER/api',
    'SOME_OTHER_URL': '/proxy',
    'DOMAIN_BACKEND_URL': 'http://localhost:8080/clinicabackend'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
