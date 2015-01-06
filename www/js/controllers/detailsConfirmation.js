App.controller('DetailsConfirmation', function($railPnrApi, $state, $scope, $rootScope, $dataService, $utils){
	$rootScope.$broadcast("changeTitle", "Confirm Details");


	$scope.travelDetails = $railPnrApi.travelDetails;

	$scope.travelDetails.distanceToAlarm = 20;

	$scope.close = function(){
		$utils.goToHome();
	};

	$scope.saveDetails = function(){

		$railPnrApi.addTravelDetails('distanceToAlarm', $scope.travelDetails.distanceToAlarm);


		var promise = $dataService.saveTravelDetails();

		promise.then(function(res){ 
			$utils.showToast('Saved travel details.');
		
		    $utils.goToHome();
		},
		 function(error){ });
	};

})
