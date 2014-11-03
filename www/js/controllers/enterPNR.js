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

			var data = JSON.parse(responseData.data);

  			var travelDetails = {};
  			travelDetails.pnr = data.pnr;
  			travelDetails.doj = data.doj;
  			travelDetails.fromStationName = data.from_station.name;
  			travelDetails.fromStationCode = data.from_station.code;
  			travelDetails.toStationName = data.to_station.name;
  			travelDetails.toStationCode = data.to_station.code;
  			travelDetails.trainName = data.train_name;
  			travelDetails.trainNo = data.train_num;
  			travelDetails.pnrStatus = data.passengers[0].current_status;

  			$railPnrApi.travelDetails = travelDetails;
  			$state.transitionTo("confirmation");
  		}catch(err){ }
		}, function(reason) {
  			
		});

	}

})
