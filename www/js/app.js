// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.App = angular.module('railTrack', ['ionic']);

App.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

App.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
 .state('home', {
      url: '/home',
      views: {
        'homeView': {
          templateUrl: 'templates/homeTpl.html'
        }
      }
    })
 .state('pnr', {
      url: '/pnr',
      views: {
        'homeView': {
          templateUrl: 'templates/enterPNR.html'
        }
      }
    })
  .state('train', {
      url: '/train',
      views: {
        'homeView': {
          templateUrl: 'templates/enterTrain.html'
        }
      }
    })
  .state('confirmation', {
      url: '/confirmation',
      views: {
        'homeView': {
          templateUrl: 'templates/detailsConfirmation.html'
        }
      }
    })
;


 $urlRouterProvider.otherwise('/home');

});

