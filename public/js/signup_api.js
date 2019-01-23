/**
 * http://usejsdoc.org/
 */

var driverSignupApp = angular.module('driverSignupApp',['ngSanitize', 'MassAutoComplete']);
driverSignupApp.controller('driverSignup',function ($scope, $http, $sce, $q){
	////
	var flag1=0;
	var results = [];
	// $scope.dirty = {};

	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
	              'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
	              'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
	              'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
	              'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
	              'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
	              'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
	              'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
	              'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	            ];
	
	$scope.existemail = true ;
	
	  function suggest_state(term) {

   if(!term){alert("not okk");}else{
	var q = term.toLowerCase().trim();
	

   // Find first 10 states that start with `term`.
   for (var i = 0; i < states.length && results.length < 10; i++) {
     var state = states[i];
     if (state.toLowerCase().indexOf(q) === 0)
       results.push({ label: state, value: state });
   }

if(results.length==0){
alert("no rsults"); flag1=1;
return alert("noott okkk");
}

//   return results;
 }}
	$scope.autocomplete_options = {
   suggest: suggest_state
 };

//
	$scope.existemail = true ;
	
	$scope.next = function(){
		$scope.invalid_login = true;
		$scope.unexpected_error = true;
		
		var flag = 0;
		var str = "";
	 	var phn = /^[0-9]{10}$/;
	 	var zip1=/^[0-9]{5}(?:-[0-9]{4})?$/;
		var zipp1=zip1.exec($scope.billing_zip);
		var zip2=/^[0-9]{5}$/;
		var zipp2=zip2.exec($scope.billing_zip);
	    var emailpattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
	    
		
		alert($scope.billing_zip);
	    

		if($scope.email == null){
			flag =1;
			str = str+  "Email is required. ";
			
		}
		
		if($scope.password == null || $scope.password.length < 6){
			flag =1;
			str = str + "Password is required and must be 5 characters atleast";
		}
		
		var ph1=phn.exec($scope.mobile);
	 		 if(ph1){
	 			 alert("OK");
	 		 }
	 		 else{
	 			 flag=1;
	 			 str = str + "Telephone problem";
	 		 }  	
	 		 
	 	if (zipp1 || zipp2)
			{
				alert("OK");
			}	
			else {
				flag=1;
				str = str + "Zip is improper ";
			}	 
		if($scope.firstname == null){
			flag =1;
			str = str +" Firstname must not be null";
			
		}
		
		if($scope.lastname == null){
			flag =1;
			str = str + "Lastname must not be null";
		}
		if(flag1 == 1)
		{
		alert("INVALID STATE ");
		return;
		}

	    if(flag==1)
		{
			alert("inside flag");
			alert("ERRORS : "+str);
			$scope.show = str;
			return;
		}
		
		console.log("Inside controller"+$scope.email);	 
		
		$http({
			method : "POST",
			url : '/driverSignupNext',
			data : {
				"dfirst_name" : $scope.firstname,
				"dlast_name" : $scope.lastname,
				"demail" : $scope.email,
				"dcontactinfo":$scope.mobile,
				"dpassword" : $scope.password,
				"dcity_name" : $scope.dcity_name,
				"dstate_name" : results[0].value,
				"daddress" : $scope.daddress,
				"dpostalcode" : $scope.billing_zip
			}
		}).success(function(data) {
			alert("data.statusCode"+data.statusCode);
			//checking the response data for statusCode
			if (data.statusCode === 401) {
				$scope.invalid_login = false;
				$scope.unexpected_error = true;
			}
			else if(data.statusCode === 200){
				//Making a get call to the '/redirectToHomepage' API
				window.location.assign("/nextstep");}
			else if(data.statusCode === 500){
				$scope.existemail = false;
			}
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};
});