App.controller('HomeController', function($railPnrApi, $scope, $rootScope,  $ionicModal, $state){

	$scope.title = 'Track my Journey';


	$rootScope.$on('changeTitle', function(event, title) {
				$scope.title = title;
	});

	$rootScope.$broadcast("changeTitle", "Track my Journey");


	$ionicModal.fromTemplateUrl('my-modal.html', {
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

