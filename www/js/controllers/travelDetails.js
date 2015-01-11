App.controller('TravelDetails', function($state, $scope, $rootScope, $dataService, $stateParams, $utils, $locationService, $dateService){
	$rootScope.$broadcast("changeTitle", "Track my Journey");


	var travelId = $stateParams.id;

	var criteria = {};
	criteria['id'] = travelId;

	var promise = $dataService.getResults('travelDetails', criteria);

	promise.then(function(res){

		if(res.rows.length > 0){
			$scope.travelDetails = res.rows.item(0);
		}

	},function(error){

	});

	$scope.getFormattedDate = function(time){
		var date = $dateService.getDate(time);
		return $dateService.getFormattedDate(date);
	};

	$scope.getFormattedTime = function(time){
		var date = $dateService.getDate(time);
		return date.getHours()+":"+date.getMinutes();
	};	

	$scope.deleteTravel = function(){

		var deletePromise = $dataService.deleteRecords('travelDetails', criteria);

		deletePromise.then(function(res){

			$utils.showToast('Deleted successfully');
		
		    $utils.goToHome();
		    
		},function(error){

		});		
	};

	$scope.trackTravel = function(){

			var latLogString = $scope.travelDetails.toStationLatLog;
			var fields = latLogString.split(":");

			alert(fields);

			var lat1 = parseFloat(fields[0]);
			var lon1 = parseFloat(fields[1]);

			var lat2 = 65.9667;
			var lon2 = -18.5333;

			alert($locationService.caluculateDistance(lat1, lon1, lat2, lon2 ));
			alert($locationService.distance(lat1, lon1, lat2, lon2 ));


		var promise = $locationService.getLocation();		

		promise.then( function(location){
			alert(JSON.stringify(location));

			var latLogString = $scope.travelDetails.toStationLatLog;
			var fields = latLogString.split(":");

			var lat1 = parseFloat(fields[0]);
			var lon1 = parseFloat(fields[1]);

			var lat2 = parseFloat(location.coords.latitude);
			var lon2 = parseFloat(location.coords.longitude);

			alert($locationService.caluculateDistance(lat1, lon1, lat2, lon2 ));
			alert($locationService.distance(lat1, lon1, lat2, lon2 ));
			
		}, function(error){
			alert(JSON.stringify(error));
		})

	};

})
