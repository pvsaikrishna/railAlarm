App.controller('DetailsConfirmation', function($railPnrApi, $state, $scope, $rootScope, $dataService, $cordovaToast){
	$rootScope.$broadcast("changeTitle", "Confirm Details");


	$scope.travelDetails = $railPnrApi.travelDetails;

	$scope.travelDetails.distanceToAlarm = 20;

	$scope.close = function(){
		$state.transitionTo("home.details");
	};

	$scope.saveDetails = function(){

		$railPnrApi.addTravelDetails('distanceToAlarm', $scope.travelDetails.distanceToAlarm);


		var promise = $dataService.saveTravelDetails();

		promise.then(function(res){ 
			$cordovaToast.showShortTop('Saved travel details.').then(function(success) {
    			// success
 			 }, function (error) {
   			 // error
  			});
		 $state.transitionTo("home.details");},
		 function(error){ });
	};

})
