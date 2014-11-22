App.controller('EnterPNR', function($railPnrApi, $state, $scope, $rootScope, $cordovaLocalNotification){


	$rootScope.$broadcast("changeTitle", "Enter PNR");

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.close = function(){
		$state.transitionTo("home");
	}

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
			//TODO get pnr status of the last passender instead of the fist
			$railPnrApi.addTravelDetails('pnrStatus', data.passengers[0].current_status);

  			$state.transitionTo("confirmation");
  			}catch(err){ }
		}, function(error) {
  			
		});

	}

})
