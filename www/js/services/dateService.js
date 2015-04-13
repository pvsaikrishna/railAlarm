"use strict";

App.service('$dateService', function($cordovaSQLite, $railPnrApi){

	var m_names = new Array("Jan", "Feb", "Mar", 
						"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
						"Oct", "Nov", "Dec");

	var d_name = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");

	this.getFormattedDate = function(date){

		return date.toDateString();
		
	};

	this.getDate = function(time){
		time = parseInt(time);
		return new Date(time);
	}

	this.getFormattedDay = function(date){
		return d_name[date.getDay()];
	}


});
