"use strict";

App.service('$dataService', function($cordovaSQLite, $railPnrApi){

	var db ;


	var executeQuery = function(query, params){

		if(window.isAndroid){

			return $cordovaSQLite.execute(db, query, params);
		}	 		
	};

	var init = function(){

		if(window.isAndroid){

		db =  $cordovaSQLite.openDB("railAlarm.db");

		var createTableQuery = 'CREATE TABLE IF NOT EXISTS travelDetails (id integer primary key, pnr text, doj integer, trainName text, trainNo text, fromStationName text, fromStationCode text, toStationName text, toStationCode text, distanceToAlarm integer, pnrStatus text,  distanceToReach integer)';

		var promise = executeQuery(createTableQuery);

		promise.then(function(res) {
		}, function(error) {
  			alert('Failed to create table: ' + JSON.stringify(error));
		});

		}
	};


	this.get = function(){
	};

	var getValues = function(){
		var values = [];

		values.push($railPnrApi.travelDetails.pnr);
		values.push($railPnrApi.travelDetails.doj);
		values.push($railPnrApi.travelDetails.trainName);
		values.push($railPnrApi.travelDetails.trainNo);
		values.push($railPnrApi.travelDetails.fromStationName);
		values.push($railPnrApi.travelDetails.fromStationCode);
		values.push($railPnrApi.travelDetails.toStationName);
		values.push($railPnrApi.travelDetails.toStationCode);
		values.push($railPnrApi.travelDetails.distanceToAlarm);
		values.push($railPnrApi.travelDetails.pnrStatus);
		values.push($railPnrApi.travelDetails.distanceToReach);

		return values;

	};

	this.saveTravelDetails = function(){
		//retrieves data from RailPnrService

		var values = getValues();

		var insertQuery = "INSERT INTO travelDetails (pnr, doj, trainName, trainNo, fromStationName, fromStationCode, toStationName, toStationCode, distanceToAlarm, pnrStatus, distanceToReach) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

		return executeQuery(insertQuery, values);
	};

	init();

});
