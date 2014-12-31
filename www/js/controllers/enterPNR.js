App.controller('EnterPNR', function($railPnrApi, $state, $scope, $rootScope, $cordovaToast, $cordovaNetwork){


	$rootScope.$broadcast("changeTitle", "Enter PNR");

	var init = function(){

		if(!$cordovaNetwork.isOnline()){

          $cordovaToast.showShortTop('Enable internet to fetch PNR details.');
          $rootScope.goToHome();

      	}

	};

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.close = function(){
		$state.transitionTo("home.details");
	}

	$scope.fetchstationCoOrdinates = function(stationCode){

		console.log('entered fetchstationCoOrdinates');

		var promise = $railPnrApi.getStationByCode(stationCode);

		promise.then(function(responseData) {

			try{ 

				responseData = $railPnrApi.getJSObject(responseData);

				console.log(JSON.stringify(responseData));

				var data = $railPnrApi.getJSObject(responseData.data);

				var stations = $railPnrApi.getJSObject(data.stations);
				

				if(stations.length >= 1){
					var location = $railPnrApi.getJSObject(data.stations[0].location);
					$railPnrApi.addTravelDetails('toStationLatLog', location.lat + ':' + location.lng);

		  			$state.transitionTo("confirmation");

				}

			}catch(error){ console.log(error)}
		}, function(error){

		});
	};


	$scope.getPNRDetails = function(){

		var promise = $railPnrApi.getPnrStatus($scope.pnr);


		promise.then(function(responseData) {

			try{

			
			responseData = $railPnrApi.getJSObject(responseData);
			var data = $railPnrApi.getJSObject(responseData.data);



			//var data = responseData.data;

			$railPnrApi.clearTravelDetails();

			$railPnrApi.addTravelDetails('pnr', data.pnr);
			$railPnrApi.addTravelDetails('doj', data.doj);
			$railPnrApi.addTravelDetails('fromStationName', data.from_station.name);
			$railPnrApi.addTravelDetails('fromStationCode', data.from_station.code);
			$railPnrApi.addTravelDetails('toStationName', data.to_station.name);
			$railPnrApi.addTravelDetails('toStationCode', data.to_station.code);
			$railPnrApi.addTravelDetails('trainName', data.train_name);
			$railPnrApi.addTravelDetails('trainNo', data.train_num);
			
			$scope.fetchstationCoOrdinates(data.to_station.code);

  			}catch(err){ console.log(err); }
		}, function(error) {
  			console.log(error)
		});

	};

	init();

})
