"use strict";

App.service('$locationService', function($cordovaGeolocation, $ionicLoading, $q){


var showProgress = function(){
                $ionicLoading.show({
                  template: 'Fetching location co-ordinates. Please wait as this might take sometime ...'
                 });
    };

    var hideProgress = function(){
            $ionicLoading.hide();
    }


	this.getLocation = function(){

		var q = $q.defer();

        var geoLocation = window.plugins.locationBackgroundWatcher;

		showProgress();

		geoLocation.getlocation(function(successData){

			if(typeof successData.latitude !== 'undefined'){
        		q.resolve(successData);
        		hideProgress();
        	}

		}, function(error){

			q.reject(error);
			hideProgress();
		});
		


		return q.promise;
	};

	

	this.caluculateDistance = function(lat1, lon1, lat2, lon2) {


		var unit = "K";

		var radlat1 = Math.PI * lat1/180
		var radlat2 = Math.PI * lat2/180
		var radlon1 = Math.PI * lon1/180
		var radlon2 = Math.PI * lon2/180
		var theta = lon1-lon2
		var radtheta = Math.PI * theta/180
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist)
		dist = dist * 180/Math.PI
		dist = dist * 60 * 1.1515
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist
	};    

	this.distance = function(lat1,lon1,lat2,lon2) {
		var R = 6371; // km (change this constant to get miles)
		var dLat = (lat2-lat1) * Math.PI / 180;
		var dLon = (lon2-lon1) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		if (d>1) return Math.round(d)+"km";
		else if (d<=1) return Math.round(d*1000)+"m";
		return d;
	};
                   
	
});
