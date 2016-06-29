'use strict';

angular
  .module('main')
  .factory('FlashService', FlashService);

FlashService.$inject = ['$rootScope', '$ionicPopup', '$ionicLoading'];
function FlashService ($rootScope, $ionicPopup, $ionicLoading) {
  var service = {};

  service.Success = Success;
  service.Error = Error;
  service.Loading = Loading;
  service.Question = Question;
  initService();

  return service;

  function initService () {
    $rootScope.$on('$locationChangeStart', function () {
      clearFlashMessage();
    });

    function clearFlashMessage () {
      var flash = $rootScope.flash;
      if (flash) {
        if (!flash.keepAfterLocationChange) {
          delete $rootScope.flash;
        } else {
// only keep for a single location change
          flash.keepAfterLocationChange = false;
        }
      }
    }
  }

  function Success (message) {
    $ionicPopup.alert({
      title: 'Success',
      template: '<center>' + message + '</center>',
      cssClass: 'positive'
    });
  }

  function Loading (isLoading, message) {
    if (isLoading) {
      $ionicLoading.show({
        template: '<center>' + (message ? message : 'Loading...') + '</center>'
      });
    } else {
      $ionicLoading.hide();
    }
  }
  function Error (message) {
    $ionicPopup.alert({
      title: 'Warning',
      template: '<center>' + message + '</center>',
      cssClass: 'assertive'
    });
  }
  function Question (message, yes) {
    var question = $ionicPopup.confirm({
      title: 'Question',
      template: '<center>' + message + '</center>',
      cssClass: 'assertive'
    });
    question.then(function (res) {
      if (res) {
        yes();
      }
    });
  }
}

