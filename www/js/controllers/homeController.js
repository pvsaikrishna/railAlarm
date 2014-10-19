App.controller('HomeController', function($railPnrApi, $scope, $rootScope){

	$scope.title = 'Track my Journey';

	$rootScope.$on('changeTitle', function(event, title) {
				$scope.title = title;
	});



})
