"use strict";

App.service('$httpService', function($cordovaHttp, $q, $timeout, $ionicLoading, $utils){

	var pnrJson = {'data':{"response_code":200,"pnr":"6224484662","train_num":"12311","train_name":"HWH DLI KLK MAI","doj":"23-12-2013","from_station":{"code":"DLI","name":"Delhi"},"to_station":{"code":"KLK","name":"Kalka"},"reservation_upto":{"code":"KLK","name":"Kalka"},"boarding_point":{"code":"DLI","name":"Delhi"},"class":"1A","no_of_passengers":3,"chart_prepared":"N","passengers":[{"sr":"1","booking_status":"CNF  ,GN","current_status":"CNF"},{"sr":"2","booking_status":"W/L    1,RLGN","current_status":"W/L    1"},{"sr":"3","booking_status":"W/L    2,RLGN","current_status":"W/L    2"}],"error":null}};
  var trainJson =  {'data':{ "response_code": 200, "msg":" NO TRAIN" , "train": {"number": "12004","name": "Lko Swran Shtbd","full_name": null,"days": [{ "day-code": "SUN", "runs": "Y"},{ "day-code": "MON", "runs": "Y"},{ "day-code": "TUE", "runs": "Y"},{ "day-code": "WED", "runs": "Y"},{ "day-code": "THU", "runs": "Y"},{ "day-code": "FRI", "runs": "Y"},{ "day-code": "SAT", "runs": "Y"}],"classes": [{ "class-code": "1A", "available": "Y"},{ "class-code": "2A", "available": "N"},{ "class-code": "FC", "available": "N"},{ "class-code": "3A", "available": "N"},{ "class-code": "CC", "available": "Y"},{ "class-code": "SL", "available": "N"},{ "class-code": "2S", "available": "N"},{ "class-code": "3E", "available": "N"}],"pantry": "INFO N/A","route": [{ "no": "1", "arrival_time": "Start", "departure_time": "06:15", "stop_time": "0", "day": "1", "distance": "0 KM", "station": {"name": "New Delhi","code": "NDLS","location": {"lat": "28.6443713","lng": "77.219678"} }},{ "no": "2", "arrival_time": "06:45", "departure_time": "06:47", "stop_time": "2 min", "day": "1", "distance": "26 KM", "station": {"name": "Ghaziabad","code": "GZB","location": {"lat": "28.6501396","lng": "77.4321876"} }},{ "no": "3", "arrival_time": "07:50", "departure_time": "07:52", "stop_time": "2 min", "day": "1", "distance": "132 KM", "station": {"name": "Aligarh Junction","code": "ALJN","location": {"lat": "27.889327","lng": "78.0741077"} }},{ "no": "4", "arrival_time": "08:49", "departure_time": "08:51", "stop_time": "2 min", "day": "1", "distance": "207 KM", "station": {"name": "Tundla Junction","code": "TDL","location": {"lat": "27.2078039","lng": "78.2335523"} }},{ "no": "5", "arrival_time": "09:42", "departure_time": "09:44", "stop_time": "2 min", "day": "1", "distance": "302 KM", "station": {"name": "Etawah","code": "ETW","location": {"lat": "26.7864874","lng": "79.0223023"} }},{ "no": "6", "arrival_time": "11:20", "departure_time": "11:25", "stop_time": "5 min", "day": "1", "distance": "440 KM", "station": {"name": "Kanpur Central","code": "CNB","location": {"lat": "26.4528466","lng": "80.3237478"} }},{ "no": "7", "arrival_time": "12:30", "departure_time": "Ends", "stop_time": "0", "day": "1", "distance": "511 KM", "station": {"name": "Lucknow Nr","code": "LKO","location": {"lat": "26.8310723","lng": "80.9256124"} }}] }} };

    var showProgress = function(){
                $ionicLoading.show({
                  template: 'Fetching details. Please wait ...'
                 });
    };

    var hideProgress = function(){
            $ionicLoading.hide();
    }


	this.get = function(url){

    console.log("Fetch request for url : "+url);

		var q = $q.defer();

        showProgress();


		if(window.isAndroid){
 				$cordovaHttp.get(url, {}, {}).then(function(data){
                                console.log("Fetched data : "+JSON.stringify(data));
                                q.resolve( data );
                        }, function(error){
                                $utils.showToast("Network error : Please check your network settings and try again ");
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
               else if(url.indexOf("route/train/") != -1){
                q.resolve(trainJson);
               }

                hideProgress();
               
    		}, 1000);

		}
	
				return q.promise;

	};

});
