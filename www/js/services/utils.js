"use strict";

App.service('$utils', function($state, $ionicPopup, $cordovaToast){


  this.goToHome = function(){
      $state.transitionTo("home.details");
  };

   // An alert dialog
  this.showAlert = function(message, stay) {
   var alertPopup = $ionicPopup.alert({
     title: 'Error :(',
     template: message
   });
   alertPopup.then(function(res) {
     $rootScope.goToHome();
   });
  };

  this.showToast = function(message){

    $cordovaToast.showShortCenter(message);

  };

	
});
