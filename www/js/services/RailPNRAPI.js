"use strict";

App.service('$railPnrApi', function($http, $httpService){

	var baseUrl = "http://railpnrapi.com/test/";

	var _public_token = "23d71e07a273ca43c565000418dd7867";
	var _private_token = "c8bf74082eea9bc309fafe24f5fd402e";

	var self = this;

	this.travelDetails = {};

	this.clearTravelDetails = function(){
		self.travelDetails = {};
	};

	this.addTravelDetails = function(key, value){
		self.travelDetails[key] = value;
	}


	var getHMACSignature = function(paramsString){

		var shaObj = new jsSHA(paramsString, "TEXT");
		
		var hmac = shaObj.getHMAC(_private_token, "TEXT", "SHA-1", "HEX");
	
		return hmac;
			

	};

	this.getJSObject = function(data){
		if(typeof data == 'string'){
				return JSON.parse(data);
			}else{
				return data;	
		}

	}

	this.getPnrStatus = function(pnr){
	
		/*
			params : pnr, format,pbapikey
	
			sorted order = format,pbapikey,pnr
		*/

		var hmacText = 'json'+_public_token+pnr;

		hmacText = hmacText.toLowerCase();

		var hmacSignature = getHMACSignature(hmacText);	

		var url = baseUrl+"check_pnr/pnr/"+pnr+"/format/json/pbapikey/"+_public_token+"/pbapisign/"+hmacSignature;

		return $httpService.get(url);
	};

	this.getTrainSchedule = function(trainNo){

		/*
			params : trainNo, format,pbapikey
	
			sorted order = format,pbapikey,trainNo
		*/

		var hmacText = 'json'+_public_token+trainNo;
		hmacText = hmacText.toLowerCase();

		var hmacSignature = getHMACSignature(hmacText);	


		var url = baseUrl+"route/train/"+trainNo+"/format/json/pbapikey/"+_public_token+"/pbapisign/"+hmacSignature; 

		return $httpService.get(url);
	}

});
