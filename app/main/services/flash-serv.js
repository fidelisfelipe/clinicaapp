'use strict';

angular
  .module('main')
  .factory('FlashService', FlashService);

FlashService.$inject = ['$rootScope', '$ionicPopup', '$ionicLoading'];

function FlashService($rootScope, $ionicPopup, $ionicLoading) {
  var service = {};

  initService();
  service.Success = Success;
  service.Error = Error;
  service.Loading = Loading;
  service.Question = Question;
  service.FormEdit = FormEdit;
  service.ModalAddResult = ModalAddResult;


  return service;

  function initService() {
    componentHandler.upgradeDom('mdl-spinner');
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

  function clearAlert(){
    if(document.getElementsByClassName('sweet-alert')[0] != null){
      var sweet_alert = document.getElementsByClassName('sweet-alert')[0].classList;
      sweet_alert.remove("loading-swa");
      sweet_alert.remove("success-swa");
      sweet_alert.remove("warning-swa");
      sweet_alert.remove("error-swa");
    }
  }

  function Success(message) {
    clearAlert();

    swal({
      title: "Success!",
      text: message,
      type: "success",
      customClass: "success-swa",
      allowOutsideClick: true,
      showCancelButton: false,
      showConfirmButton: false
    });

  }

  function Loading(isLoading, message) {

    clearAlert();

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

    clearAlert();

      swal({
        title: "Oops...",
        text: message,
        type: "error",
        customClass: "error-swa",
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: false,
        animation: 'none'
      });

  }

  function Question(message, yes) {

    clearAlert();

    swal({
        title: "Tem certeza?",
        text: message,
        type: "warning",
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Sim",
        closeOnConfirm: false,
        allowOutsideClick: true,
        showCancelButton: true,
        showConfirmButton: true,
        customClass: 'warning-swa',
        animation: 'none'
      }, function(){
        yes();
      });
    }
    function ModalAddResult(title, data, index, stringInputPlaceholder, successCallBack){
      clearAlert();
      swal({
          title: title,
          text: data,
          type: "input",
          showCancelButton: true,
          closeOnConfirm: false,
          //animation: "slide-from-top",
          inputPlaceholder: stringInputPlaceholder,
          animation: 'none'
        },
        function(inputValue){
          
          if (inputValue === false) return false;
          
          if (inputValue === '') {
            swal("Cancelled", "Nenhum valor informado", "warning-swa");
            //var result = search value in backend
            //
            //if result is empty
            //  not change
            //else : FlashService.Question("Deseja remover este valor?");
            //não: 
            return false
          }
          successCallBack();
          
          
        });
    }
    

    function FormEdit(){

      clearAlert();

      swal({
        title: "Success!",
        text: "Teste",
        type: "success",
        customClass: "success-swa",
        allowOutsideClick: true,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  }
