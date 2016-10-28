'use strict';
angular.module('main')
.service('UtilService', function ($log, $rootScope, $http, FlashService) {
  var user =  new function () {
    this.id = null;
    this.nome = '';
    this.email = '';
    this.firstName = '';
    this.lastName = '';
    this.role = '';
    this.isAuthorized = false;
    this.isAdmin = false;
  };
  var UtilService = {
/**
 * Functions for Callback features
 */
//onValidUpdateAccount
    onValidUpdateAccount: function (response) {
      if (response.status === 200) {
        //sincronize data for user with model
        UtilService.refreshUserCurrentForData();
        //set authorized post logon
        UtilService.setIsAuthorized();
        //sincronize var user with root user
        UtilService.refreshUserCurrentRoot();
        FlashService.Success('Change account successfull...');
      } else {
        FlashService.Error('Change account fail...', response.data);
      }
    },
//onErrorUpdateAccount
    onErrorUpdateAccount: function (response) {
      FlashService.Error(response.data);
    },
//onValidSignup
    onValidSignup: function (response, callback) {
      FlashService.Success('Sign Up Successfull!');
      callback();
    },
//onErrorSignup
    onErrorSignup: function (response) {
      $log.log('sigup error: ', response.data);
      if (response.status === 406) {
        if (response.data.error_description === 'Membership failure:InvalidPassword') {
          FlashService.Error('password is lenght invalid! Must 6 digits!');
        } else {
          FlashService.Error(response.data.error_description);
        }
      } else {
        FlashService.Error(response.data.error_description);
      }
    },
//onValidUpdatePassword
    onValidUpdatePassword: function (data, logout) {
      FlashService.Success('Change password successfull...');
      logout();
    },
//onErrorUpdatePassword
    onErrorUpdatePassword: function (data) {
      FlashService.Error(data.data);
    },
/**
 * Functions for User
 */
//setUserCurrent
    setUserCurrent: function (data) {
      user.id = data.id;
      user.nome = data.nome;
      user.email = data.email;
      user.isAuthorized = data.isAuthorized;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      user.isAdmin = (user.role === 'Admin');
      user.srcImg = 'main/assets/images/profile.jpg';
      sessionStorage.currentUser = user;
    },
//setUserCurrentBlank
    setUserCurrentBlank: function () {
      user.id = null;
      user.email = '';
      user.nome = '';
      user.isAuthorized = false;
      user.isLogado = false;
      user.username = '';
      user.firstName = '';
      user.lastName = '';
      user.role = '';
      user.isAdmin = false;
      user.srcImg = '';
      sessionStorage.removeItem('currentUser');
      sessionStorage.currentUser = user;
    },
//setIsAuthorized
    setIsAuthorized: function () {
      user.isAuthorized = true;
    },
//setNotAuthorized
    setNotAuthorized: function () {
      user.isAuthorized = false;
    },
//isAutorized
    isAuthorized: function () {
      return user.isAuthorized;
    },
//getUserCurrent
    getUserCurrentLocal: function () {
       if (JSON.parse(sessionStorage.getItem('currentUser')) !== null) {
         $log.log('get user for session storage...');
         return JSON.parse(sessionStorage.getItem('currentUser'));
       }
       $log.log('get user for service util...');
      return user;
    },
//refreshUserCurrentRoot
    refreshUserCurrentRoot: function () {
      sessionStorage.currentUser = JSON.stringify(user);
    },
//refreshUserCurrentForData
    refreshUserCurrentForData: function () {

      $http({
        method: 'GET',
        url: 'tests'
      }).then(function (response) {
        UtilService.setUserForDataDomain(response.data);
        UtilService.refreshUserCurrentRoot();
      }, function (error) {
        $log.debug('fail update: ', error);
      });

    }

  };

  return UtilService;
});
