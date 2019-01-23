var app = angular.module('customerSignUp', []);

app.controller('customerSignUpCon', function($scope,$http) {
		//console.log("Firstname : " + $scope.firstname); 
		$scope.existemail = true ;
		
	$scope.signupCustomer  = function() {
		
		var flag = 0;
		var str = "";
	 	var phn = /[0-9]{10}/;
	 	var zip1=/^[0-9]{5}(?:-[0-9]{4})?$/;
		var zipp1=zip1.exec($scope.billing_zip);
		var zip2=/^[0-9]{5}$/;
		var zipp2=zip2.exec($scope.billing_zip);
	    var emailpattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
	    var re = /^([0-9]{3})(?:-[0-9]{2})(?:-[0-9]{4})$/
		
		alert($scope.billing_zip);
	    

		if($scope.email == null){
			flag =1;
			str = str+  "Email is required. ";
			
		}
		
		if($scope.password == null || $scope.password.length < 6){
			flag =1;
			str = str + "Password is required and must be 5 characters atleast";
		}
		
		var ph1=phn.exec($scope.phone);
	 		 if(ph1){
	 			 alert("OK");
	 		 }
	 		 else{
	 			 flag=1;
	 			 str = str + "Telephone problem";
	 		 } 
	 	
	 	var ssnp = re.exec($scope.ssn);
	 	var sssn=re.exec($scope.ssn);
	 	 if(sssn){
		    	alert("ssn ok");}/*else{alert("ssn not ok");}*/
		 else{
			 flag=1;
			 str = str + "SSN problem";
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
		
		if($scope.creditcard.toString().length === 16){
			
			
		}
		else{
			flag=1;
			str = str + "Creditcard must have exactly 16 digits";
		}
		
	    if(flag==1)
		{
			alert("inside flag");
			alert(str);
			$scope.show = str;
			return;
		}
		
		console.log("Inside controller"+$scope.email);	 
					
				$http({
		            method: 'POST',
		            url     : '/signUpCustomer',
		            data    : {
		            "email":$scope.email,
		      	   "password" : $scope.password,
		      	   "firstname" : $scope.firstname,
		      	   "lastname" : $scope.lastname,
		      	   "mobile" : $scope.phone,
		      	   "ssn" : $scope.ssn,
		      	   "address" : $scope.address,
		      	   "city" : $scope.city,
		      	   "state" : $scope.state,
		      	   "zipcode" : $scope.billing_zip,
		      	   "creditnumber" : $scope.creditcard,
		      	   "creditcvv" : $scope.cvv,
		      	   "creditmonth" : $scope.creditmonth,
		      	   "credityear" : $scope.credityear,
		      	   "postalcode" : $scope.billing_zip// pass in data as strings
		            }
		            }).success(function(data) {
		    			//checking the response data for statusCode
		    			if (data.statusCode === 401) {
		    				$scope.invalid_login = false;
		    				$scope.unexpected_error = true;
		    			alert("fails");
		    			}
		    			else if(data.statusCode === 200){
		    				alert("success");	
		    				//Making a get call to the '/redirectToHomepage' API
		    				window.location.assign("/ride");}
		    			else if(data.statusCode === 500){
		    			$scope.existemail =false;	
		    			}
		    		}).error(function(error) {
		    			$scope.unexpected_error = false;
		    			$scope.invalid_login = true;
		    		});
					}
					 });


/*
app.controller('loginCustomerCon', function($scope,$http) {
	
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
	    				console.log("ang err");
	    				$scope.invalid_login = false;
	    				$scope.unexpected_error = true;
	    			alert("fails");
	    			}
	    			else if(data.statusCode === 200){
	    				console.log("ang succ");
	    				alert("success");	
	    				//Making a get call to the '/redirectToHomepage' API
	    				window.location.assign("/customerHome");}
	    		}).error(function(error) {
	    			$scope.unexpected_error = false;
	    			$scope.invalid_login = true;
	    		});
	    	}; });*/