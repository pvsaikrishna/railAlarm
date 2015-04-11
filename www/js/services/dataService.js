"use strict";

App.service('$dataService', function($cordovaSQLite, $railPnrApi){

	var db ;

	var dbPointers = {};

	var isAndroid = false;


	var executeQuery = function(query, params){

		console.log(query);
		console.log(isAndroid)

		if(isAndroid){

			return $cordovaSQLite.execute(db, query, params);
		}	 		
	};

	var init = function(){

		try{
			isAndroid = ionic.Platform.isAndroid();
		}catch(err){
			console.log(err);
		}

		if(isAndroid){

		db =  $cordovaSQLite.openDB("railAlarm.db");

		var createTableQuery = 'CREATE TABLE IF NOT EXISTS travelDetails (id integer primary key, pnr text, doj integer, trainName text, trainNo text, fromStationName text, fromStationCode text, toStationName text, toStationCode text, distanceToAlarm integer, toStationLatLog text, status integer)';

		var promise = executeQuery(createTableQuery);

		promise.then(function(res) {
		}, function(error) {
  			alert('Failed to create table: ' + JSON.stringify(error));
		});

		}
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

		//var insertQuery = "INSERT INTO travelDetails (pnr, doj, trainName, trainNo, fromStationName, fromStationCode, toStationName, toStationCode, distanceToAlarm, pnrStatus, distanceToReach) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

		return executeQuery(insertQuery, insertData.values);
	};

	this.getAllTravelDetails = function(){
		var query = "SELECT * FROM travelDetails"

		return executeQuery(query);
	};


	var getWhereClause = function(criteria, booleanType){

		var selectQuery = "";

		if(typeof criteria != 'undefined'){
			selectQuery =  " where ";

			var count = 0;

			for(var key in criteria) {
				count++;
			}

			for(var key in criteria) {
				count--;

				selectQuery = selectQuery + key + " = '" + criteria[key] +"' ";

				if(count > 0) {
					selectQuery = selectQuery + " " + booleanType;
				}
			}
		}

		return selectQuery;

	}


	/*
		tableName -- String : Name of the table to query on.
		criteria -- Map : Consists of column label and value to search
		booleanType -- String : should be either OR | AND
	*/
	this.getResults = function(tableName, criteria, booleanType){
		var selectQuery = "select * from "+tableName;

		selectQuery = selectQuery + getWhereClause(criteria, booleanType);

		return executeQuery(selectQuery);
	};

	/*
		tableName -- String : Name of the table to query on.
		criteria -- Map : Consists of column label and value to search
		booleanType -- String : should be either OR | AND
	*/
	this.deleteRecords = function(tableName, criteria, booleanType){
		var selectQuery = "delete from "+tableName;

		selectQuery = selectQuery + getWhereClause(criteria, booleanType);

		return executeQuery(selectQuery);
	};


	this.getStatusString = function(status){
		status = parseInt(status);
		if(status === 0){
			return "Ready to track";
		}else if (status === 1) {
			return "In Progress";
		}else if (status === 2){
			return "Stopped";
		}
	};

	this.updateStatus = function(travelId, status){

		var updateQuery = "UPDATE travelDetails set status =  "+ status+" where id = "+ travelId;

		return executeQuery(updateQuery);
	};

	init();

});
