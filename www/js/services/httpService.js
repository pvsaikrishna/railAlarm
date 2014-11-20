"use strict";

App.service('$httpService', function($cordovaHttp, $q, $timeout, $ionicLoading){

	var pnrJson = {'data':{"response_code":200,"pnr":"6224484662","train_num":"12311","train_name":"HWH DLI KLK MAI","doj":"23-12-2013","from_station":{"code":"DLI","name":"Delhi"},"to_station":{"code":"KLK","name":"Kalka"},"reservation_upto":{"code":"KLK","name":"Kalka"},"boarding_point":{"code":"DLI","name":"Delhi"},"class":"1A","no_of_passengers":3,"chart_prepared":"N","passengers":[{"sr":"1","booking_status":"CNF  ,GN","current_status":"CNF"},{"sr":"2","booking_status":"W/L    1,RLGN","current_status":"W/L    1"},{"sr":"3","booking_status":"W/L    2,RLGN","current_status":"W/L    2"}],"error":null}};

    var showProgress = function(){
                $ionicLoading.show({
                  template: 'Fetching details. Please wait ...'
                 });
    };

    var hideProgress = function(){
            $ionicLoading.hide();
    }


	this.get = function(url){

		var q = $q.defer();

        showProgress();


		if(window.isAndroid){
 				$cordovaHttp.get(url, {}, {}).then(function(data){
                                q.resolve( data );
                        }, function(error){
                                q.reject(error);
                        }).finally( function(){
                                hideProgress();
                        });	
      	}
		else{
			//for mocking purpose to test in browser

			$timeout(function() {
       				 if(url.indexOf("check_pnr/pnr") != -1){
       				 	q.resolve(pnrJson);
       				 }
    		}, 1000);

		}
	
				return q.promise;

	};

});
