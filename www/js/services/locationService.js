"use strict";

App.service('$locationService', function($cordovaGeolocation){


	this.getLocation = function(){


		var geo_options = { maximumAge: 0, timeout: 25000, enableHighAccuracy: true };

	/*
	There are three possible causes of error:
	User denied permission to retrieve his position (code 1).
	Position unavailable (code 2).
	Timeout expired (code 3).
	*/

		var promise = $cordovaGeolocation.getCurrentPosition(geo_options);

		return promise;
	};

	this.caluculateDistance = function(lat1, lon1, lat2, lon2) {

		alert(lat1+"-"+lon1+"-"+lat2+"-"+lon2);

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
		alert(lat1+"-"+lon1+"-"+lat2+"-"+lon2);
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
