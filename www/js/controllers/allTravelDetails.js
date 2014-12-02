App.controller('AllTravelDetails', function($state, $scope, $rootScope, $dataService){
	$rootScope.$broadcast("changeTitle", "Track my Journey");


	$scope.allTravelDetails = [];

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
				
				for(var i=0; i<res.rows.length; i++){
					console.log(JSON.stringify(res.rows.item(i)));
					$scope.allTravelDetails.push(res.rows.item(i));
				}

				

 			}, function (error) {
   			 // error
  		});
	};

	init();

})
