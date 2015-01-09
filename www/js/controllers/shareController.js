App.controller('ShareController', function($state, $scope, $rootScope, $state, $stateParams, $utils, $cordovaSocialSharing){


	var type = $stateParams.type;

	$scope.type = type;


	$scope.close = function(){
		$state.transitionTo("home.details");
	};

	$scope.shareText = "Awesome android app for tense free travel.";

	var link = "https://play.google.com/store/apps/details?id=com.labakshaya.trainalarm";

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
    		 $utils.showToast('Thanks for sharing with '+type+' :)');
    		 $scope.close();
  		 }, function(err) {
     		 $utils.showToast('Sorry :(, you need '+type+' installed in your device to share');
    	});

	};




})
