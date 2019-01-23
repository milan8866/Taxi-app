/**
 * http://usejsdoc.org/
 */

var driverVehicleApp = angular.module('driverVehicleApp',[]);
driverVehicleApp.controller('driverVehicle',function ($scope, $http){
	
	$scope.vehicleUpdated = function(){
		
		console.log("d_id : "+$scope.d_id+"d_cartype : "+$scope.d_cartype+"d_carnumber : "+$scope.d_carnumber);
		
		$scope.invalid_login = true;
		$scope.unexpected_error = true;
		$http({
			method : "POST",
			url : '/vehicleUpdated',
			data : {
				"d_id" : $scope.d_id,
				"d_cartype" : $scope.d_cartype,
				"d_carnumber" : $scope.d_carnumber
			}
		}).success(function(data) {
			alert("success vehice update"+JSON.stringify(data));
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				alert("success vehice errrorr update"+JSON.stringify(data));
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if(data.statusCode === 200){
				alert("success vehice update111"+JSON.stringify(data));
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/driverHome/backgroundCheck");
			//window.location="/driverHome/backgroundCheck";
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
});

