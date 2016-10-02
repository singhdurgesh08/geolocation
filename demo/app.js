angular
  .module('geolocationDemo', ['ngGeolocation'])
  .controller('AppController', function($scope,$http, $geolocation){
    $scope.$geolocation = $geolocation
	
	var BaseUrl = "http://api.openweathermap.org/data/2.5/weather?";
	// basic usage
	// Get Weather Detail As per Geo location
	try {
     $geolocation.getCurrentPosition().then(function(location) {
	 if(location){ 
	   $scope.location = location;
	   var latitude = $scope.location.coords.latitude;
	   var longitude = $scope.location.coords.longitude;
	   $http.get(BaseUrl+'lat='+latitude+'&lon='+longitude+'&appid=e3aa78c6e5a41216956c3c49adbb2df0')
            .success(function (data, status, headers, config) {
				
                $scope.Details = data;
				console.log($scope.Details);
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
	   
	 }else{
		 alert("Please Enter zip Or country");
	 }
    });
	}catch(err) {
    $("#showerror").html(err.message);
   }

	
	// Get Weather Detail by Zip Code
	
    $scope.getWeatherByZip = function() {
		try {
		var zip = $("#zip").val();
        $http.get(BaseUrl+'q='+zip+'&appid=e3aa78c6e5a41216956c3c49adbb2df0')
            .success(function (data, status, headers, config) {
				
                $scope.Details = data;
				console.log($scope.Details);
				$("#myModal").modal('hide');
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + jsonFilter(header) +
                    "<br />config: " + jsonFilter(config);
            });
		}catch(err) {
    
	        $("#showerror").html(err.message);
   }
    };


    // regular updates
    $geolocation.watchPosition({
      timeout: 60000,
      maximumAge: 2,
      enableHighAccuracy: true
    });
    $scope.coords = $geolocation.position.coords; // this is regularly updated
    $scope.error = $geolocation.position.error; // this becomes truthy, and has 'code' and 'message' if an error occurs
  });