App.controller('TravelDetails', function($q, $state, $scope, $rootScope, $dataService, $stateParams, $utils, $locationService, $dateService, $ionicPopup) {
    $rootScope.$broadcast("changeTitle", "Track my Journey");

    var geoLocation = window.plugins.locationBackgroundWatcher;

    var getFormattedStatus = function(status) {
        return $dataService.getStatusString(status);
    };

    var travelId = $stateParams.id;

    $scope.travelDetails = {};
    $scope.travelDetails.isTracking = false;
    $scope.travelDetails.trackingStatus = "N/A";
    var criteria = {};
    criteria['id'] = travelId;

    var promise = $dataService.getResults('travelDetails', criteria);

    promise.then(function(res) {

        if (res.rows.length > 0) {
            $scope.travelDetails = res.rows.item(0);
            $scope.travelDetails.remainingDistance = "N/A";

            if (parseInt($scope.travelDetails.status) === 1) {
                $scope.travelDetails.isTracking = true;
            }

            $scope.travelDetails.trackingStatus = getFormattedStatus($scope.travelDetails.status);
        }

    }, function(error) {

    });

    $scope.getFormattedDate = function(time) {
        var date = $dateService.getDate(time);
        return $dateService.getFormattedDate(date);
    };

    $scope.getFormattedTime = function(time) {
        var date = $dateService.getDate(time);
        return date.toLocaleTimeString();
    };



    $scope.deleteTravel = function() {

        var deletePromise = $dataService.deleteRecords('travelDetails', criteria);

        deletePromise.then(function(res) {

            $utils.showToast('Deleted successfully');

            $utils.goToHome();

        }, function(error) {

        });
    };

    var openLocationSettings = function(locationFetchPromise) {

        diagnostic.switchToLocationSettings(function(data) {
            //locationFetchPromise.resolve();
            locationFetchPromise.reject(); //promise is being resolved immediately even before user turns GPS on.
        }, function(errorData) {
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
            if (res) {
                openLocationSettings(locationFetchPromise);
            } else {
                locationFetchPromise.reject();
                $rootScope.goToHome();
            }
        });
    };

    var checkGPSAvailability = function() {
        var locationFetchPromise = $q.defer();

        //check1 -- check if gps is enabled or not
        diagnostic.isGpsEnabled(function(successData) {
            //alert('gps is enabled'+JSON.stringify(successData));
            if (successData.success == true) {
                locationFetchPromise.resolve();
            } else {
                showConfirm(locationFetchPromise);
            }
        }, function(errorData) {
            showConfirm(locationFetchPromise);
        });

        return locationFetchPromise.promise;
    };

    var updateTravelStatus = function(status){
    	var promise = $dataService.updateStatus(travelId, status);
        promise.then(function(success){
        if(status === 1){
            $scope.travelDetails.isTracking = true;
        }else{
            $scope.travelDetails.isTracking = false;
        }
        $scope.travelDetails.trackingStatus = getFormattedStatus(status);
        }, function(error){})

    }

    $scope.stopTracking = function() {
        geoLocation.stop(function(success) {
            updateTravelStatus(2);
        }, function(error) {
        });
    };



    $scope.refreshTravel = function() {
        //fetch location co-ordinates and update remaining distance.

        var gpsCheckPromise = checkGPSAvailability();

        gpsCheckPromise.then(function() {

                var latLogString = $scope.travelDetails.toStationLatLog;
                var fields = latLogString.split(":");

                alert(fields);

                var promise = $locationService.getLocation();

                promise.then(function(location) {
                    alert(JSON.stringify(location));

                    var latLogString = $scope.travelDetails.toStationLatLog;
                    var fields = latLogString.split(":");

                    var lat1 = parseFloat(fields[0]);
                    var lon1 = parseFloat(fields[1]);

                    var lat2 = parseFloat(location.latitude);
                    var lon2 = parseFloat(location.longitude);

                    var remainingDistance = $locationService.distance(lat1, lon1, lat2, lon2);
                    $scope.travelDetails.remainingDistance = remainingDistance;

                }, function(error) {
                    alert(JSON.stringify(error));
                });


            }, function(error) {


            }

        );
    };

    $scope.trackTravel = function() {

        //check1 -- check if any other journeys are being tracked
        var criteria = {};
        criteria['status'] = 1;

        var dbQueryPromise = $dataService.getResults('travelDetails', criteria);

        dbQueryPromise.then(function(res) {
            if (res.rows.length == 0) {
                //check2 gps enabled or not
                var gpsCheckPromise = checkGPSAvailability();

                gpsCheckPromise.then(function() {

                    $scope.refreshTravel();

                    var latLogString = $scope.travelDetails.toStationLatLog;
	                var fields = latLogString.split(":");


                    var successCallBack = function(data) {
                        geoLocation.start(function(success) {
                        	updateTravelStatus(1);
                    	}, function(error) {

                    	});
                    };
                    var errorCallBack = function(data) {
                        alert('false');
                        alert(JSON.stringify(data));
                    }

                    geoLocation.configure(successCallBack, errorCallBack, {
                        latitude: fields[0],
                        longitude: fields[1],
                        distanceToAlarm: $scope.travelDetails.distanceToAlarm,
                        debug: true,
                        notificationTitle: 'Train Alarm',
                        notificationText: 'Tracking your Journey',
                        stopOnTerminate: true
                    });

                    

                }, function() {});

            } else {
                $utils.showAlert("Tracking of another travel is in progress. Only one travel can be tracked at a time.", true);
            }
        }, function(error) {

        });

    };



})