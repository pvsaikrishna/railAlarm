<<<<<<< HEAD
App.controller('EnterPNR', function($railPnrApi, $scope, $rootScope){


	$rootScope.$broadcast("changeTitle", "Enter PNR");
=======
App.controller('EnterPNR', function($railPnrApi,$scope){
>>>>>>> a97ca1cc212d47a5bcab44f9696ca17f3b6a5e9e

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.getPNRDetails = function(){
		$railPnrApi.getPnrStatus($scope.pnr);
	}

})
