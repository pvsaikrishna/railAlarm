App.controller('EnterPNR', function($railPnrApi, $state, $scope, $rootScope, $cordovaNetwork, $utils){


	$rootScope.$broadcast("changeTitle", "Enter PNR");

	var init = function(){

		if(!$cordovaNetwork.isOnline()){

          $utils.showToast('Enable internet to fetch PNR details.');
		
		  $utils.goToHome();

      	}

	};

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.close = function(){
		$utils.goToHome();
	}

	$scope.fetchstationCoOrdinates = function(fromStationCode, toStationCode, trainNo){

		console.log('entered fetchstationCoOrdinates');

		var promise = $railPnrApi.getTrainSchedule(trainNo);


		promise.then(function(responseData) {

			try{

			
			responseData = $railPnrApi.getJSObject(responseData);
			var data = $railPnrApi.getJSObject(responseData.data);
			var trainData = $railPnrApi.getJSObject(data.train);
			
			var date = new Date();

			try{
				var dojString = $railPnrApi.getTravelDetails('doj');

				var fields = dojString.split("-");

				if(fields[0].length == 4){
					//2015-01-26
					date.setYear(parseInt(fields[0]));
					date.setMonth(parseInt(fields[1])-1);
					date.setDate(parseInt(fields[2]));
				} else {
					//23-12-2013
					date.setDate(parseInt(fields[0]));
					date.setMonth(parseInt(fields[1])-1);
					date.setYear(parseInt(fields[2]));
				}
			}catch(err){}

			var route = trainData.route;

			for(key in route){ 
 			  console.log(route[key]);
   				if(route[key].station.code == fromStationCode){
   					//store time
   					try{
   						var fields = route[0].departure_time.split(":");
						date.setHours(parseInt(fields[0]));
						date.setMinutes(parseInt(fields[1]));
					}catch(error){}
   				}else if(route[key].station.code == toStationCode){
   					//store lat long
   					try{
   						var location = $railPnrApi.getJSObject(route[key].station.location);
   						console.log(location);
   						$railPnrApi.addTravelDetails('toStationLatLog', location.lat + ':' + location.lng);
   					}catch(error){}
   				}
			}

			$railPnrApi.addTravelDetails('doj', date.getTime());

			$state.transitionTo("confirmation");

  			}catch(err){ alert(err) }
		}, function(error) {
  			console.log(error);
		});

	};


	$scope.getPNRDetails = function(){

		var promise = $railPnrApi.getPnrStatus($scope.pnr);


		promise.then(function(responseData) {

			try{

			
			responseData = $railPnrApi.getJSObject(responseData);
			var data = $railPnrApi.getJSObject(responseData.data);

			if(data.error != null){
				$utils.showAlert(data.error);
				return;
			}



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
			
			$scope.fetchstationCoOrdinates(data.to_station.code, data.from_station.code, data.train_num);

  			}catch(err){ console.log(err); }
		}, function(error) {
  			console.log(error)
		});

	};

	init();

})
