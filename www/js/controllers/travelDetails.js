App.controller('TravelDetails', function($state, $scope, $rootScope, $dataService, $stateParams, $cordovaToast){
	$rootScope.$broadcast("changeTitle", "Track my Journey");


	var travelId = $stateParams.id;

	var criteria = {};
	criteria['id'] = travelId;

	var promise = $dataService.getResults('travelDetails', criteria);

	promise.then(function(res){

		if(res.rows.length > 0){
			$scope.travelDetails = res.rows.item(0);
		}

	},function(error){

	});

	$scope.deleteTravel = function(){

		var deletePromise = $dataService.deleteRecords('travelDetails', criteria);

		deletePromise.then(function(res){

			$cordovaToast.showShortTop('Deleted successfully');
			$rootScope.goToHome();

		},function(error){

		});		
	};
	

})
