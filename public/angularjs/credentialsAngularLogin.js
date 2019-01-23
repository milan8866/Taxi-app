var app = angular.module('customerLogIn', []);
app.controller('loginCustomerCon', function($scope,$http) {
	
	$scope.invalid = true;
	
	$scope.loginCustomer  = function() {
		console.log("in login");
			$http({
		            method: 'POST',
		            url     : '/logInCustomer',
		            data    : {
		            "email":$scope.email,
		      	   "password" : $scope.password,
		            }
		            }).success(function(data) {
		    			//checking the response data for statusCode
		    			if (data.statusCode === 401) {
		    				$scope.invalid = false;
		    				console.log("ang err");
		    				$scope.invalid_login = false;
		    				$scope.unexpected_error = true;
		    				alert("fails");
		    			}
		    			else if(data.statusCode === 200){
		    				console.log("ang succ");
		    				alert("success");	
		    				//Making a get call to the '/redirectToHomepage' API
		    				window.location.assign("/ride");}
		    		}).error(function(error) {
		    			$scope.unexpected_error = false;
		    			$scope.invalid_login = true;
		    		});
		    	}; 
		    	
});