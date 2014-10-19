"use strict";

App.service('$railPnrApi', function($http){

	var baseUrl = "http://railpnrapi.com/test/";

	var _public_token = "23d71e07a273ca43c565000418dd7867";
	var _private_token = "c8bf74082eea9bc309fafe24f5fd402e";

	var getHMACSignature = function(paramsString){

		var shaObj = new jsSHA(paramsString, "TEXT");
		
		var hmac = shaObj.getHMAC(_private_token, "TEXT", "SHA-1", "HEX");
	
		return hmac;
			

	};

	this.getPnrStatus = function(pnr, callback){
	
		/*
			params : pnr, format,pbapikey
	
			sorted order = format,pbapikey,pnr
		*/

		var hmacText = 'json'+_public_token+pnr;

		hmacText = hmacText.toLowerCase();

		var hmacSignature = getHMACSignature(hmacText);	

		var url = baseUrl+"check_pnr/pnr/"+pnr+"/format/json/pbapikey/"+_public_token+"/pbapisign/"+hmacSignature;

	

//		$http.get(url).success(callback);


		$.ajax({
            url: url,
            method: 'GET',
            crossDomain: true,
            dataType: 'json',
	    headers: {'Access-Control-Allow-Origin':'*'},
            success: function(data){

		alert(data);

            },
            error: function(data){
		alert(data);
            alert('ERROR');
            }
        });

		
	}



	

});