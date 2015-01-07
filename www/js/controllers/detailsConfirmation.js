App.controller('DetailsConfirmation', function($railPnrApi, $state, $scope, $rootScope, $dataService, $dateService, $utils, $cordovaLocalNotification){
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

		    console.log(res.insertId);

		    if(res.insertId > 0){
				

				var data = res.rows.item(0);

				var id = res.insertId;

				var date = $dateService.getDate( $railPnrApi.getTravelDetails('doj') );
				var now  = new Date();

				var notificationId = 'railAlarmCurrent'+id;

				$cordovaLocalNotification.add({
      					id: notificationId,
      					title: 'Track you jounrney',
      					message: 'You train should be on platform soon. Start tracking your jounrney.',
      					date: date
    			});

    			notificationId = 'railAlarmBefore6'+id;
    			if(date.getTime() - 21600000 > now.getTime()){
					$cordovaLocalNotification.add({
      					id: notificationId,
      					title: 'Journey reminder',
      					message: 'You have Journey scheduled today. Have you packed your luggage.',
      					date: new Date(date.getTime() - 21600000)
    				});
				}

    			notificationId = 'railAlarmDay'+id;
    			date.setHours(0);
    			date.setMinutes(0)
    			if(date.getTime() > now.getTime() ) {
					$cordovaLocalNotification.add({
      					id: notificationId,
      					title: 'Journey reminder',
      					message: 'You have Journey scheduled today. Have you packed your luggage ?',
      					date: date
    				});
				}
			}

		    
		},
		 function(error){ });
	};

})
