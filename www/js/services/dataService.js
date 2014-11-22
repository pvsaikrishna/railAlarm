"use strict";

App.service('$dataService', function($cordovaSQLite, $railPnrApi){

	var db ;

	var dbPointers = {};


	var executeQuery = function(query, params){

		if(window.isAndroid){

			return $cordovaSQLite.execute(db, query, params);
		}	 		
	};

	var init = function(){

		if(window.isAndroid){

		db =  $cordovaSQLite.openDB("railAlarm.db");

		var createTableQuery = 'CREATE TABLE IF NOT EXISTS travelDetails (id integer primary key, pnr text, doj text, trainName text, trainNo text, fromStationName text, fromStationCode text, toStationName text, toStationCode text, distanceToAlarm integer, pnrStatus text,  distanceToReach integer, fromStationLatLog text, toStationLatLog text)';

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
		var data = {};

		var fields=[];
		var values=[]; 
		var valueReferences = [];

		for(var key in $railPnrApi.travelDetails) { 
			fields.push(key); 
			values.push($railPnrApi.travelDetails[key]) 
			valueReferences.push("?");
		};

		data['values'] = values;
		data['fields'] = JSON.stringify(fields).replace("[","(").replace("]",")").replace(new RegExp("\"", 'g'), "'");
		data['valueReferences'] = JSON.stringify(valueReferences).replace("[","(").replace("]",")").replace(new RegExp("\"", 'g'), "");;

		return data;

	};

	this.saveTravelDetails = function(){
		//retrieves data from RailPnrService

		var insertData = getValues();

		console.log(JSON.stringify(insertData));

		var insertQuery = "INSERT INTO travelDetails "+ insertData.fields+" VALUES "+ insertData.valueReferences;


		console.log(insertQuery);

		//var insertQuery = "INSERT INTO travelDetails (pnr, doj, trainName, trainNo, fromStationName, fromStationCode, toStationName, toStationCode, distanceToAlarm, pnrStatus, distanceToReach) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

		return executeQuery(insertQuery, insertData.values);
	};

	init();

});
