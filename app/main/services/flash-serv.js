'use strict';

angular
  .module('main')
  .factory('FlashService', FlashService);

FlashService.$inject = ['$rootScope', '$ionicPopup', '$ionicLoading'];

function FlashService($rootScope, $ionicPopup, $ionicLoading) {
  var service = {};

  componentHandler.upgradeDom('mdl-spinner');

  service.Success = Success;
  service.Error = Error;
  service.Loading = Loading;
  service.Question = Question;
  initService();

  return service;

  function initService() {
    $rootScope.$on('$locationChangeStart', function() {
      clearFlashMessage();
    });

    function clearFlashMessage() {
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

  function Success(message) {

    swal({
      title: "Success!",
      text: message,
      type: "success",
      customClass: "success-swa"
    });

  }

  function Loading(isLoading, message) {

    var spinner = '<div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active is-upgraded"></div>';
    message = '<div class="loading-message">' + message + '</div>';

    if (isLoading) {
      swal({
        title: '',
        text: spinner + message,
        html: true,
        customClass: "loading-swa",
        animation: 'none'
      });
    } else {
      swal.close();
    }

  }

  function Error(message) {

    swal({
      title: "Oops!",
      text: message,
      type: "error",
      customClass: "error-swa"
    });

  }

  function Question(message, yes) {

    swal({
        title: "Tem certeza?",
        text: message,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        closeOnConfirm: false,
        customClass: 'warning-swa'
      }, function(){
        yes();
      });
    }
  }
