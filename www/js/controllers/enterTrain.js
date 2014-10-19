App.controller('EnterTrain', function($railPnrApi, $scope, $rootScope){
	$rootScope.$broadcast("changeTitle", "Enter Train Number");


	var sampleJson = '{ "response_code": 200, "train": {"number": "12004","name": "Lko Swran Shtbd","full_name": null,"days": [{ "day-code": "SUN", "runs": "Y"},{ "day-code": "MON", "runs": "Y"},{ "day-code": "TUE", "runs": "Y"},{ "day-code": "WED", "runs": "Y"},{ "day-code": "THU", "runs": "Y"},{ "day-code": "FRI", "runs": "Y"},{ "day-code": "SAT", "runs": "Y"}],"classes": [{ "class-code": "1A", "available": "Y"},{ "class-code": "2A", "available": "N"},{ "class-code": "FC", "available": "N"},{ "class-code": "3A", "available": "N"},{ "class-code": "CC", "available": "Y"},{ "class-code": "SL", "available": "N"},{ "class-code": "2S", "available": "N"},{ "class-code": "3E", "available": "N"}],"pantry": "INFO N/A","route": [{ "no": "1", "arrival_time": "Start", "departure_time": "06:15", "stop_time": "0", "day": "1", "distance": "0 KM", "station": {"name": "New Delhi","code": "NDLS","location": {"lat": "28.6443713","lng": "77.219678"} }},{ "no": "2", "arrival_time": "06:45", "departure_time": "06:47", "stop_time": "2 min", "day": "1", "distance": "26 KM", "station": {"name": "Ghaziabad","code": "GZB","location": {"lat": "28.6501396","lng": "77.4321876"} }},{ "no": "3", "arrival_time": "07:50", "departure_time": "07:52", "stop_time": "2 min", "day": "1", "distance": "132 KM", "station": {"name": "Aligarh Junction","code": "ALJN","location": {"lat": "27.889327","lng": "78.0741077"} }},{ "no": "4", "arrival_time": "08:49", "departure_time": "08:51", "stop_time": "2 min", "day": "1", "distance": "207 KM", "station": {"name": "Tundla Junction","code": "TDL","location": {"lat": "27.2078039","lng": "78.2335523"} }},{ "no": "5", "arrival_time": "09:42", "departure_time": "09:44", "stop_time": "2 min", "day": "1", "distance": "302 KM", "station": {"name": "Etawah","code": "ETW","location": {"lat": "26.7864874","lng": "79.0223023"} }},{ "no": "6", "arrival_time": "11:20", "departure_time": "11:25", "stop_time": "5 min", "day": "1", "distance": "440 KM", "station": {"name": "Kanpur Central","code": "CNB","location": {"lat": "26.4528466","lng": "80.3237478"} }},{ "no": "7", "arrival_time": "12:30", "departure_time": "Ends", "stop_time": "0", "day": "1", "distance": "511 KM", "station": {"name": "Lucknow Nr","code": "LKO","location": {"lat": "26.8310723","lng": "80.9256124"} }}] }}';
	
	$scope.hasTrainSchedule = false;


	$scope.getTrainSchedule = function(){

		$scope.responseData = JSON.parse(sampleJson);

		$scope.hasTrainSchedule = true;

	};

})
