App.controller('EnterTrain', function($railPnrApi, $state, $scope, $rootScope, $cordovaDatePicker, $dateService, $cordovaNetwork){
	$rootScope.$broadcast("changeTitle", "Enter Train Number");

 	$scope.hasTrainSchedule = false;

 	var init = function(){

		if(!$cordovaNetwork.isOnline()){

          $cordovaToast.showShortTop('Enable internet to fetch Train details.');
          $rootScope.goToHome();

      	}

	};

	var canSelectStation = function(date){

		var day = $dateService.getFormattedDay(date);

		for (i = 0; i < $scope.trainData.days.length; i++) {
    		if ($scope.trainData.days[i]['day-code'] == day) {
      			  if ($scope.trainData.days[i].runs == "Y") {
         		   return true
       			 } else {
         		   return false;
    	    	}
    		}
		}
	};

	$scope.close = function(){
		$state.transitionTo("home.details");
	}




	$scope.getTrainSchedule = function(){

		var promise = $railPnrApi.getTrainSchedule($scope.trainNo);


		promise.then(function(responseData) {

			try{

			$scope.hasTrainSchedule = true;
			
			responseData = $railPnrApi.getJSObject(responseData);

			var data = $railPnrApi.getJSObject(responseData.data);

			$scope.trainData = $railPnrApi.getJSObject(data.train);
			

			$railPnrApi.clearTravelDetails();

			$railPnrApi.addTravelDetails('trainName', $scope.trainData.name);
			$railPnrApi.addTravelDetails('trainNo', $scope.trainData.number);

			$scope.doj = new Date();

			$scope.dojString = $dateService.getFormattedDate($scope.doj);
			$scope.stationSelectable = canSelectStation($scope.doj);


	/*		$railPnrApi.addTravelDetails('fromStationName', data.from_station.name);
			$railPnrApi.addTravelDetails('fromStationCode', data.from_station.code);
			$railPnrApi.addTravelDetails('toStationName', data.to_station.name);
			$railPnrApi.addTravelDetails('toStationCode', data.to_station.code); */

  			}catch(err){ alert(err) }
		}, function(error) {
  			console.log(error);
		});


		
	};


	$scope.confirmDetails = function(){

			$railPnrApi.addTravelDetails('doj', $scope.dojString);
			$railPnrApi.addTravelDetails('fromStationName', $scope.fromStation.station.name);
			$railPnrApi.addTravelDetails('fromStationCode', $scope.fromStation.station.code);
			$railPnrApi.addTravelDetails('fromStationLatLog', $scope.fromStation.station.location.lat + ':' + $scope.fromStation.station.location.lng);
			
			$railPnrApi.addTravelDetails('toStationName', $scope.toStation.station.name);
			$railPnrApi.addTravelDetails('toStationCode', $scope.toStation.station.code);
			$railPnrApi.addTravelDetails('toStationLatLog', $scope.toStation.station.location.lat + ':' + $scope.toStation.station.location.lng);

			$state.transitionTo("confirmation");


	};


  //var options = {date: new Date(), mode: 'time'}; for time
  var defaultDate = new Date();
  	
  	$scope.showDatePicker = function(){

  		var options = {date: defaultDate, mode: 'date', minDate: new Date()};

 		 $cordovaDatePicker.show(options).then(function(date){
 		 	try{
    		  defaultDate = new Date(date);
    		  $scope.doj = new Date(date);
    		  $scope.dojString = $dateService.getFormattedDate(date);
    		  $scope.stationSelectable = canSelectStation($scope.doj);
    		}catch(err){ alert(err); }
  		});
	};

	init();

});