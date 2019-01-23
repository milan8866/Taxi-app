var app = angular.module('driverBackgroundApp',[]);
app.controller('driverBackground',function ($scope, $http){
	$scope.showSSN = true ;
	
	 
	$scope.addSSN = function(){
		 var re = /^([0-9]{3})(?:-[0-9]{2})(?:-[0-9]{4})$/;
		 var ssn1=re.exec($scope.d_ssn);
		 if(ssn1){
			 //alert("ok ssn"+$scope.d_ssn);
				$http({
					
					method : "POST",
					url : '/addSSN',
					data : {
						"d_video":$scope.d_video,
						"d_ssn" : $scope.d_ssn
						
					}
				}).success(function(data){
					if(data.statusCode === 200)
						{
							alert("success add ssn"+JSON.stringify(data));
							//Making a get call to the '/redirectToHomepage' API
							window.location.assign("/driverHome/documents");
						}
					else if(data.statusCode === 401)
						{
							alert("failed add ssn"+JSON.stringify(data));
							$scope.showSSN = false;
							//window.location.assign("/driverHome/backgroundCheck");
							$scope.invalid_login = false;
							$scope.unexpected_error = true;
						}
				}).error( function(error){
					$scope.unexpected_error = false;
					$scope.invalid_login = true;
				})	 
		 }
		 else{alert("not ok ssn"+$scope.d_ssn); $scope.showSSN = false ;}

	}
});