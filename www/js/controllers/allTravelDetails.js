App.controller('AllTravelDetails', function($state, $scope, $rootScope, $dataService, $dateService){
	$rootScope.$broadcast("changeTitle", "Track my Journey");


	//$scope.allTravelDetails = [];

	$scope.hasSaveTravels = false;

	var init = function(){


		//get travel details and set it to scope.

		var promise = $dataService.getAllTravelDetails();

		promise.then(function(res){ 
			
				console.log(typeof res);
				console.log(res);
				console.log(JSON.stringify(res));

				if(res.rows.length > 0){
					$scope.hasSaveTravels = true;
				}
				var tempDetails = [];
				for(var i=0; i<res.rows.length; i++){
					console.log(JSON.stringify(res.rows.item(i)));
					tempDetails.push(res.rows.item(i));
				}

				$scope.allTravelDetails = tempDetails;
				

 			}, function (error) {
   			 // error
  		});
	};

	$scope.showDetails = function(id){
		console.log('in showDetails : ' +id);
		$state.transitionTo("travelDetails", {id:id});
	}

	init();

	$scope.getFormattedDate = function(time, index){
		var date = $dateService.getDate(time);
		return $dateService.getFormattedDate(date);
	};

})
