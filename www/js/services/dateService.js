"use strict";

App.service('$dateService', function($cordovaSQLite, $railPnrApi){

	var m_names = new Array("Jan", "Feb", "Mar", 
						"Apr", "May", "Jun", "Jul", "Aug", "Sep", 
						"Oct", "Nov", "Dec");

	var d_name = new Array("SUN","MON","TUE","WED","THU","FRI","SAT");

	this.getFormattedDate = function(date){

		var curr_date = date.getDate();
		var curr_month = date.getMonth();
		var curr_year = date.getFullYear();

		return curr_date + "-" + m_names[curr_month] + "-" + curr_year;
	};

	this.getFormattedDay = function(date){
		return d_name[date.getDay()];
	}


});
