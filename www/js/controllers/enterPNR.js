App.controller('EnterPNR', function($railPnrApi,$scope){

	var parsePNRResponse = function(data){
		console.log(data);
	};

	$scope.getPNRDetails = function(){
		$railPnrApi.getPnrStatus($scope.pnr);
	}

})
