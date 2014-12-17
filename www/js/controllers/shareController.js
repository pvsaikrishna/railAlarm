App.controller('ShareController', function($state, $scope, $rootScope, $state, $stateParams, $cordovaToast, $cordovaSocialSharing){


	var type = $stateParams.type;

	$scope.type = type;


	$scope.close = function(){
		$state.transitionTo("home.details");
	};

	$scope.shareText = "Awesome android app for tense free travel.";

	var link = "http://testapp.com";

	$scope.share = function(){

		var promise;

		if(type == 'Facebook'){
			promise = $cordovaSocialSharing.shareViaFacebook($scope.shareText,null,link);
		}
		else if(type == 'Twitter'){
			promise = $cordovaSocialSharing.shareViaTwitter($scope.shareText,null,link);
		}
		else if(type == 'WhatsApp'){
			promise = $cordovaSocialSharing.shareViaWhatsApp($scope.shareText,null,link);
		}

		promise.then(function(result) {
    		 $cordovaToast.showShortTop('Thanks for sharing with '+type+' :)');
    		 $scope.close();
  		 }, function(err) {
     		 $cordovaToast.showLongTop('Sorry :(, you need '+type+' installed in your device to share');
    	});

	};




})
