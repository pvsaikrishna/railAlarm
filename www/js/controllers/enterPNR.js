App.controller('EnterPNR', function($railPnrApi, $scope, $rootScope){


	$rootScope.$broadcast("changeTitle", "Enter PNR");

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.getPNRDetails = function(){
		$railPnrApi.getPnrStatus($scope.pnr);
	}

})
