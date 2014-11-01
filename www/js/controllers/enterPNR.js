App.controller('EnterPNR', function($railPnrApi, $scope, $rootScope, $cordovaLocalNotification){


	$rootScope.$broadcast("changeTitle", "Enter PNR");

	var parsePNRResponse = function(data){
		console.log(data);
	};


	$scope.getPNRDetails = function(){

		var promise = $railPnrApi.getPnrStatus($scope.pnr);

		promise.then(function(data) {
  			alert('Success: ' + data);
		}, function(reason) {
  			alert('Failed: ' + data);
		});

	}

})
