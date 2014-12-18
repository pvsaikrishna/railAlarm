App.controller('HomeController', function($ionicPlatform, $railPnrApi, $scope, $rootScope,  $ionicModal, $state ){

  $ionicPlatform.ready(function() {
    if(AdMob) AdMob.createBanner( {
    adId:window.ad_units.android.banner, 
    adSize:'BANNER', 
    overlap:true, 
    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow:true} );
  });


  $rootScope.goToHome = function(){
      $state.transitionTo("home.details");
  };

	$scope.title = 'Track my Journey';


	$rootScope.$on('changeTitle', function(event, title) {
				$scope.title = title;
	});

	$rootScope.$broadcast("changeTitle", "Track my Journey");


	$ionicModal.fromTemplateUrl('templates/moreDetails.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

  $scope.open = function(state){
    $scope.closeModal();

    //what ever state parameter is passed.
    $state.transitionTo(state);
  }





});

