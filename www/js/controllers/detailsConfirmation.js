App.controller('DetailsConfirmation', function($railPnrApi, $state, $scope, $rootScope, $dataService, $cordovaToast){
	$rootScope.$broadcast("changeTitle", "Confirm Details");


	$scope.travelDetails = $railPnrApi.travelDetails;

	$scope.travelDetails.distanceToAlarm = 20;

	$scope.close = function(){
		$state.transitionTo("home");
	};

	$scope.saveDetails = function(){
		$railPnrApi.travelDetails.distanceToAlarm = $scope.travelDetails.distanceToAlarm;

		var promise = $dataService.saveTravelDetails();

		promise.then(function(res){ 
			$cordovaToast.showShortTop('Saved travel details.').then(function(success) {
    			// success
 			 }, function (error) {
   			 // error
  			});
		 $state.transitionTo("home");},
		 function(error){ });
	};

})
