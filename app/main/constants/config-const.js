'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'SERVER_URL': 'https://PRODSERVER/api',
    'SOME_OTHER_URL': 'https://clinicabackend.herokuapp.com',
    'DOMAIN_BACKEND_URL': 'https://clinicabackend.herokuapp.com'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
