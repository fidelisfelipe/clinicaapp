'use strict';
angular.module('main')
.service('UtilService', function ($log, $rootScope, $http, FlashService) {
  var user =  new function () {
    this.userId = 0;
    this.username = '';
    this.email = '';
    this.name = '';
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
      user.userId = data.userId || data.id;
      user.username = data.username;
      user.email = data.email;
      user.name = data.name;
      user.nome = data.nome;
      user.isAuthorized = data.isAuthorized;
      user.isLogado = data.isLogado;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.role = data.role;
      user.isAdmin = (user.role === 'Admin');
      user.srcImg = 'main/assets/images/profile.jpg';
      sessionStorage.currentUser = user;
    },
//setUserForDataDomain
    setUserForDataDomain: function (data) {
      user.firstName = data.firstName;
      user.lastName = data.lastName;
    },
//setUserCurrentBlank
    setUserCurrentBlank: function () {
      user.userId = 0;
      user.email = '';
      user.name = '';
      user.nome = '';
      user.isAuthorized = false;
      user.isLogado = false;
      user.username = '';
      user.firstName = '';
      user.lastName = '';
      user.role = '';
      user.isAdmin = false;
      user.srcImg = '';
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
    getUserCurrentTest: function () {
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
