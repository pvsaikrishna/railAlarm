App.controller('TravelDetails', function($q, $state, $scope, $rootScope, $dataService, $stateParams, $utils, $locationService, $dateService,$ionicPopup){
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

	var openLocationSettings = function(locationFetchPromise){

		diagnostic.switchToLocationSettings(function(data){ 
			//locationFetchPromise.resolve();
			locationFetchPromise.reject(); //promise is being resolved immediately even before user turns GPS on.
		}, function(errorData){ 
			$rootScope.showAlert("Unable to open location settings. Please enable it manually.");
			locationFetchPromise.reject();
		 });
	}


	 // A confirm dialog
 	var showConfirm = function(locationFetchPromise) {
  		 var confirmPopup = $ionicPopup.confirm({
    		 title: 'Location Settings',
   			 template: 'Tracking needs location settings to be enabled. Click OK to enable and try again.'
  		 });
  	 confirmPopup.then(function(res) {
    	 if(res) {
    	 	openLocationSettings(locationFetchPromise);
    	 } else {
    	 	locationFetchPromise.reject();
    	 	$rootScope.goToHome();
    	 }
 		});
	 };

	$scope.trackTravel = function(){

		$dataService.updateStatus(travelId, 1);

		var locationFetchPromise = $q.defer();
/*			var bgGeo = window.plugins.locationBackgroundWatcher;

			var callBack = function(data){
				alert('true dkfj');
				alert(JSON.stringify(data));
			};
						var callBack1 = function(data){
							alert('false dkfj');
				alert(JSON.stringify(data));
			}

		bgGeo.getlocation(callBack, callBack1);*/

		//check1 -- check if gps is enabled or not

		diagnostic.isGpsEnabled(function(successData){
			//alert('gps is enabled'+JSON.stringify(successData));
			if(successData.success == true){
				locationFetchPromise.resolve();
			}else{
				showConfirm(locationFetchPromise);
			}
		},function(errorData){
			showConfirm(locationFetchPromise);
		});

		//check2 -- check if any other journeys are being tracked


		locationFetchPromise.promise.then( function(){

		var latLogString = $scope.travelDetails.toStationLatLog;
		var fields = latLogString.split(":");

		alert(fields);

			
		var promise = $locationService.getLocation();		

		promise.then( function(location){
			alert(JSON.stringify(location));

			var latLogString = $scope.travelDetails.toStationLatLog;
			var fields = latLogString.split(":");

			var lat1 = parseFloat(fields[0]);
			var lon1 = parseFloat(fields[1]);

			var lat2 = parseFloat(location.latitude);
			var lon2 = parseFloat(location.longitude);

			alert($locationService.caluculateDistance(lat1, lon1, lat2, lon2 ));
			

			var callBack = function(data){
				alert('true');
				alert(JSON.stringify(data));
			};
						var callBack1 = function(data){
							alert('false');
				alert(JSON.stringify(data));
			}

			bgGeo.configure(callBack, callBack1, {
				latitude  : location.latitude,
				longitude : location.longitude,
				distanceToAlarm : 20,
				debug : true,
				notificationTitle : 'Train Alarm',
				notificationText : 'Tracking your Journey', 
				stopOnTerminate : true
			});

			//bgGeo.start();

		}, function(error){
			alert(JSON.stringify(error));
		});

		}, function(){} );

	};

	

})
