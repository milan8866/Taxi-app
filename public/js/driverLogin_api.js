/**
 * http://usejsdoc.org/
 */

var driverLoginApp = angular.module('driverLoginApp',[]);

driverLoginApp.controller('driverLoginCon',function($scope,$http){
	
	$scope.invalid = true;
	
		$scope.signin = function(){
		$scope.invalid_login = true;
		$scope.unexpected_error = true;
		$http({
			method : "POST",
			url : '/driverLoginNext',
			data : {
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			alert("after login");
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				alert("after login error");
				$scope.invalid = false;
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if(data.statusCode === 200 && data.flag === 0){ alert("after login flag 0");
				//Making a get call to the '/redirectToHomepage' API
			alert("nect Step");
				window.location.assign("/nextstep");}
			else if(data.statusCode === 200 && data.flag === 1){ alert("after login flag 1");
				window.location.assign("/driverHome/profile");
			}
		}).error(function(error) {
			alert("errrrr00");
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
	
});