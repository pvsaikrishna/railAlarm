"use strict";

App.service('$utils', function($state, $ionicPopup, $cordovaToast, $rootScope){


  this.goToHome = function(){
      $state.transitionTo("home.details");
  };

   // An alert dialog
  this.showAlert = function(message, stay) {
    if(typeof stay === 'undefined'){
      stay = false
    }
   var alertPopup = $ionicPopup.alert({
     title: 'Error :(',
     template: message
   });
   alertPopup.then(function(res) {
     if(!stay){
      $rootScope.goToHome();
    }
   });
  };

  this.showToast = function(message){

    $cordovaToast.showShortCenter(message);

  };

  this.parseInt = function(number){
    return parseInt(number);
  }

	
});
