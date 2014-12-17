// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.App = angular.module('railTrack', ['ionic','ngCordova']);

window.isAndroid = false;

window.ad_units = {
    
      android : {
           banner: 'ca-app-pub-2712795411006242/4035709753', // or DFP format "/6253334/dfp_example_ad"
           interstitial: 'ca-app-pub-2712795411006242/2558976553'
        }
  };

App.run(function($ionicPlatform, $cordovaLocalNotification, $rootScope, $state, $cordovaNetwork, $cordovaToast) {
  $ionicPlatform.ready(function() {

    window.isAndroid = ionic.Platform.isAndroid();

    console.log("ionic.Platform.isAndroid() :" + ionic.Platform.isAndroid() );
    console.log("window.isAndroid : " + ionic.Platform.isAndroid());

    $rootScope.goToHome = function(){
      $state.transitionTo("home.details");
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  if(window.isAndroid ){
      $rootScope.goToHome();

      console.log($cordovaNetwork.getNetwork());

      console.log($cordovaNetwork.isOnline());

      if(!$cordovaNetwork.isOnline()){

          $cordovaToast.showShortTop('Please enable internet to leverage all features.').then(function(success) {
            // success
            }, function (error) {
            // error
            });

      }
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
 .state('home.details', {
      url: '/alltravel',
      views: {
        'detailsView': {
          templateUrl: 'templates/allTravelDetailsTpl.html'
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
  .state('details', {
      url: '/alltravel',
      views: {
        'homeView': {
          templateUrl: 'templates/allTravelDetailsTpl.html'
        }
      }
    })
   .state('about', {
      url: '/about',
      views: {
        'homeView': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('feedback', {
      url: '/feedback',
      views: {
        'homeView': {
          templateUrl: 'templates/feedback.html'
        }
      }
    })
;


 $urlRouterProvider.otherwise('/home');

});



