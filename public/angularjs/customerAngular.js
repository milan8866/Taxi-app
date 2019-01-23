var app1 = angular.module('customerHome', []);


app1.controller('customerHomeCon', function($scope,$http) {

	$scope.password=true;
	
	$scope.changePassword  = function() {
		console.log("in change password");
			
		$scope.password=false;
		
	}; 
	
//set flags 
	
	$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
	// update profile
	
	$scope.updateProfile =function(profile){
		var emailpattern = /^([a-zA-Z0-9])+([a-zA-Z0-9._%+-])+@([a-zA-Z0-9_.-])+\.(([a-zA-Z]){2,6})$/;
		var emailp=emailpattern.exec($scope.profile.email);
		
		var phone=/[0-9]{10}/;
		var phonep=phone.exec($scope.profile.mobile);
		var zip1=/^[0-9]{5}(?:-[0-9]{4})?$/;
		var zipp1=zip1.exec($scope.profile.zipcode);
		var zip2=/^[0-9]{5}$/;
		var zipp2=zip2.exec($scope.profile.zipcode);
		if(zipp1 || zipp2){alert("valid zipcode"+$scope.profile.zipcode);}else{alert("invalid zipcode"+zipp1);}
		
		if($scope.profile.firstt_name===""){alert("null");}else{alert("not null");}
		if($scope.profile.password === $scope.profile.currentPassword)
			
			{
			alert("pas change");
				if($scope.profile.newPassword === $scope.profile.confirm_newPassword)
					{
						
					if($scope.profile.first_name!==""){

						if($scope.profile.last_name!==""){
							
							if($scope.profile.email!==""){
								
								if(emailp){
									if(phonep){
										if(zipp1 || zipp2){
							$http({
								method:"POST",
								url:"/customerProfileUpdate",
								data:JSON.stringify($scope.profile)
							}).success(function(data){
								$scope.results=data;
								
								if (data.statusCode === 401) {
				    				console.log("ang err");
				    				
				    			alert("fails");
				    			}
				    			else if(data.statusCode === 200){
				    				console.log("ang succ");
				    				alert("success");	
				    				
				    				window.location.assign("/customerHome");}
				    		}).error(function(error) {
				    			alert(error);
				    		});		
										}
										else
									{
											$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.cpass=true;$scope.cupass=true;
											$scope.zip==false;
									}
									}
									else
										{
										$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
										$scope.mb=false;
										}
									}
								else
									{
									$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
									$scope.eid1=false;
									}
							
							}
							else
								{
								$scope.lastname=true;$scope.firstname=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
								$scope.eid=false;
								}
						}
						else
							{
							alert("please Enter lastname");
							$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
							$scope.lastname=flase;
							}
					}
					else{
						$scope.lastname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
						$scope.firstname=false;
						}

			
					}
				else{
					alert("new password doesnot match");
					$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cupass=true;
					$scope.cpass=false;
				}		
			
			}
		
		else if(!$scope.profile.newPassword)
			{
			alert("pas change1");
			alert("in not pass");
			alert("last name not"+$scope.profile.last_name);
			
			if($scope.profile.first_name!==""){
			if($scope.profile.last_name!==""){
				if($scope.profile.email!==""){
					if(emailp){
						if(phonep){
							if(zipp1 || zipp2){
				alert("lastindside name not"+$scope.profile.last_name);
				$http({
					method:"POST",
					url:"/customerProfileUpdate",
					data:JSON.stringify($scope.profile)
				}).success(function(data){
					$scope.results=data;
					
					if (data.statusCode === 401) {
	    				console.log("ang err");
	    				
	    			alert("fails");
	    			}
	    			else if(data.statusCode === 200){
	    				console.log("not ang succ");
	    				alert("success");	
	    				
	    				window.location.assign("/customerHome");}
	    		}).error(function(error) {
	    			alert(error);
	    		});
							}
							else
								{	
									$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.cpass=true;$scope.cupass=true;
									$scope.zip=false;
								}
						}
						else
							{
							$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
							$scope.mb=false;
							}
						}
					
					else
						{
						$scope.lastname=true;$scope.firstname=true;$scope.eid=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
						$scope.eid1=false;
						}
					}
				else
					{
					$scope.lastname=true;$scope.firstname=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
					$scope.eid=false;
					}
				}
			else
			{
				$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
				$scope.lastname=false;
			}
			}
			else {
					$scope.firstname=true;$scope.eid=true;$scope.eid1=true;$scope.mb=true;$scope.zip=true;$scope.cpass=true;$scope.cupass=true;
					$scope.firstname=false;
			}
			}
			
		else{
			alert("pas change2");
			alert("current password doesnot match");
			$scope.cupass=false;
		}	
			
			
			};
	
});


var app = angular.module('customerPayment', []);
app.controller('customerPaymentCon', function($scope,$http) {
	
			$scope.creditShow=true;
			
			$scope.creditChange  = function() {
				console.log("credit change");
					
				$scope.creditShow=false;
				
			}; 
			
			$scope.creditHide  = function() {
				console.log("in credit hide");
					
				$scope.creditShow=true;
				
			}; 
			$scope.cvv1=true;$scope.cnum=true;
			
			$scope.updateCreditDetails =function(credit){
				
				$scope.abcd=$scope.credit.c_creditcard.toString().length;
				
				if($scope.abcd===16)
				{
					 if($scope.credit.c_cvv.toString().length === 3 || $scope.credit.c_cvv.toString().length === 4)
						 {
						 $http({method:"POST",
								url:"/creditDetailsUpdate",
								data:JSON.stringify($scope.credit)}).success(function(data){
								$scope.results=data;
								
								if (data.statusCode === 401) {
				    				console.log("ang err");
				    				
				    			alert("fails");
				    			}
				    			else if(data.statusCode === 200){
				    				console.log("ang succ");
				    				alert("success");	
				    				
				    				window.location.assign("/customerPayment");}
				    		}).error(function(error) {
				    			alert(error);
				    		});
						}
					 else{
						 alert("cvv must be 3/4 digits");
						 $scope.cnum=true;
						 $scope.cvv1=false;
						 //window.location.assign("/customerPayment");
						 }
					 }
				
				
			 else{
				 alert("card number invalid"+$scope.abcd);
				 $scope.cvv1=true;
				 $scope.cnum=false;
				 // window.location.assign("/customerPayment");
			 }
			 
};		
	
	
});




///////////////////////////////////////////////CUSTOMER TRIP///////////////////////////////////////////////

var app2 = angular.module('customerTrips', []);
app2.controller('customerTripsCon', function($scope,$http) {
	alert("Inside Customer Trips");	
	$http({method:"GET",
		url:"/getCustomerTrips"})
		.success(function(response){
			alert("in succes trips"+response.data);
			$scope.customerTrips = response.data;
			alert("xxxx ins success trips"+$scope.customerTrips);
       		
    }).error(function(error){
        alert("ERROR DISPLAYING CUSTOMER TRIPS");
    });
	
	$scope.myMap = function(origin,destination){
		alert("Mapss" + origin + " " + destination);
		var url = "https://maps.googleapis.com/maps/api/staticmap?size=480x480";
		var key = "key=AIzaSyCj_Nbn9F1IL5ZUIrWX91ge_sAqZ2iJoZY";
		var maptype = "maptype=roadmap";
		var path = "path=color:0x0000ff|weight:5|"+origin+"|"+destination;
		var marker = "markers="+origin+"|"+destination; 
		var finalPath = url+"&"+maptype+"&"+marker+"&"+path+"&"+key;
		$scope.finalPath=finalPath;
		console.log(finalPath);
	}
	
});