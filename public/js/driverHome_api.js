/**
 * http://usejsdoc.org/
 */

var driverHomeApp = angular.module('driverHomeApp',['ngRoute','ngMap']);

driverHomeApp.config(['$routeProvider', '$locationProvider',function ($routeProvider,$locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/driverprofile', {
        templateUrl : '/partial/driverProfile.ejs',
        controller  : 'profileCon'
    })
	.when('/goonline', {
        templateUrl : '/partial/driverOnline.ejs',
        controller  : 'MarkerRemoveCtrl'
    })
	.when('/drivertrips', {
        templateUrl : '/partial/driverTrips.ejs',
        controller  : 'driverTripsCon'
    })
	.when('/dlogout/driver', {
		templateUrl : '/partial/logout.ejs',
		controller  : 'logoutCon'
    })
    .when('/',{
    	templateURL : 'index.ejs'
    });
	
}]);

//////logout//////////
driverHomeApp.controller('logoutCon',function($scope,$http){
	alert("in driver logout");
	$http({
		method:"GET",
		url:"/dlogout",
	}).success(function(){
		window.location.assign('/');
	});
	
});

///////update profile driver/////

driverHomeApp.controller('profileCon',function($scope,$http){
	
	
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
		
		if($scope.profile.first_name===""){alert("null");}else{alert("not null");}
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
								url:"/driverProfileUpdate",
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
				    				
				    				window.location.assign("/driverHome/profile");}
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
					url:"/driverProfileUpdate",
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
	    				
	    				window.location.assign("/driverHome/profile");}
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

//////////////////////////////trips///////////////////////////

driverHomeApp.controller('driverTripsCon', function($scope,$http) {
	alert("Inside Driver Trips");	
	$http({method:"GET",
		url:"/getDriverTrips"})
		.success(function(response){
			alert("in succes trips"+response.data);
			$scope.driverTrip = response.data;
			alert("xxxx ins success trips"+$scope.driverTrip);
       		
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


//MAPS

//var myApp = angular.module('myApp', [ 'ngMap' ]);

driverHomeApp.controller('MarkerRemoveCtrl', function($scope, $compile, socket, $http) {
	$scope.pos = "current-location";
	$scope.dpos = "";
	$scope.circle = "current-location";
	var vm = this;
	$scope.posarr = [];
	
	//****Pranav 30.11.2015****////
	$scope.cid = "";
	$scope.cname = "";
	$scope.clast = "";
	$scope.corigin = "";
	$scope.cdestination = "";
	//*********////
	
	$scope.positions = [ {
		lat : 37.33034475143813,
		lng : -121.9207763671875
	}, {
		lat : 37.7699298,
		lng : -122.4463157
	}, {
		lat : 37.7629298,
		lng : -122.4469157
	}, {
		lat : 37.7699294,
		lng : -122.4463157
	} ];
	$scope.addMarker = function(event) {
		var ll = event.latLng;
		$scope.positions.push({
			lat : ll.lat(),
			lng : ll.lng()
		});
	}
	$scope.deleteMarkers = function() {
		$scope.positions = [];
	};
	$scope.showMarkers = function() {
		for ( var key in $scope.map.markers) {
			$scope.map.markers[key].setMap($scope.map);
		}
		;
	};
	$scope.hideMarkers = function() {
		for ( var key in $scope.map.markers) {
			$scope.map.markers[key].setMap(null);
		}
		;
	};

	$scope.showInfoWindow = function(position) {
		alert("You have clicked on Position[" + position.latLng.lat()
				+ ", " + position.latLng.lng() + "]"+position.formatted_address);
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({'location': position.latLng}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      if (results[1]) {
		       // map.setZoom(11);
		       /* var marker = new google.maps.Marker({
		          position: latlng,
		          map: map
		        });*/
		        //infowindow.setContent(results[1].formatted_address);
		        //infowindow.open(map, marker);
		        console.log(results[1].formatted_address);
		      } else {
		        window.alert('No results found');
		      }
		    } else {
		      window.alert('Geocoder failed due to: ' + status);
		    }
		  });
	};
	
	
	   $scope.placeChanged = function() {
	     $scope.place = this.getPlace();
	     console.log(
	       $scope.place.geometry.location.lat(),
	       $scope.place.geometry.location.lng()
	     );	
	     console.log($scope.pos);
	     $scope.pos = $scope.place.geometry.location.lat() + "," + $scope.place.geometry.location.lng();
	     $scope.circle =  "[" + $scope.place.geometry.location.lat()
			+ "," + $scope.place.geometry.location.lng() + "]";
	     console.log($scope.pos);
	     //vm.map.setCenter(vm.place.geometry.location);
	   }
	   
	   $scope.dplaceChanged = function() {
		     $scope.dplace = this.getPlace();
		     console.log(
		       $scope.dplace.geometry.location.lat(),
		       $scope.dplace.geometry.location.lng(),$scope.dplace
		     );	
		     console.log($scope.dpos);
		     $scope.dpos = $scope.dplace.geometry.location.lat() + "," + $scope.dplace.geometry.location.lng();
		     console.log($scope.dpos);
		     
		     //vm.map.setCenter(vm.place.geometry.location);
		   }
	   
	   /******Pranav 30.11.2015******////
	   $scope.goOnline = function(demail)
	   {
		   $scope.onlinebtn = "true";
		   console.log("Clicked" + demail);
		   $http({
			   method:"POST",
			   url:"/goonlineDriver",
			   data:{demail:demail}
		   }).success(function(data){
			   console.log(data);
		   }).error(function(err){
			   throw err;
		   });
		   
	   }
	   
	   $scope.goOffline = function(demail)
	   {
		   $scope.onlinebtn = "false";
		   console.log("clicked" + demail);
		   $http({
			   method:"POST",
			   url:"/goOfflineDriver",
			   data: {demail:demail}
		   }).success(function(data){
			   console.log(data);
		   }).error(function(err){
			   throw err;
		   });
	   }
	   
	   socket.on('generated status',function(request)
				  {
		   			alert(JSON.stringify(request));
		   			if((request.data != null) && ($scope.onlinebtn === "true"))
		   			{
		   			$scope.request_div = true;
			  		console.log("Cutomer name: " + request.data.c_fname);
			  		$scope.cname = request.data.c_fname+" "+request.data.c_lname;
			  		$scope.request_div = true ;
			  		$scope.startRide = false ;
			  		$scope.corigin = request.data.origin;
			  		$scope.cdestination = request.data.destination;
			  		$scope.cid = request.data.c_id;
			  		}
				  });
	   
	  $scope.acceptRequest = function(demail,did,cid){
		  socket.emit('request accepted',demail,did,cid);
		  $http({
			   method:"POST",
			   url:"/goOfflineDriver",
			   data: {demail:demail}
		   }).success(function(data){
			   console.log(data);
		   }).error(function(err){
			   throw err;
		   });
		  $scope.startRide = true;
		  $scope.request_div = false;
		  $scope.online_offline = true;
	  }
	  
	  $scope.declineRequest = function(demail,did,cid){
		  socket.emit("request declined",demail,did,cid);
			$scope.cid = "";
			$scope.cname = "";
			$scope.corigin = "";
			$scope.cdestination = "";
			$scope.request_div = false;
			$route.reload();
	  }
	  
	  $scope.startRideClick = function(demail,did,cid)
	  {
		  alert("Start ride");
		  $http({
			  method:"POST",
			  url:'/startRide',
			  data:{"demail":demail,"did":did,"cid":cid}
		  }).success(function(data){
			 if(data.statusCode === 200)
			 {
				 console.log(JSON.stringify(data));
				 socket.emit("ride started",demail,did,cid);
			 }
			  
			  else if(data.statusCode === 401)
				  {console.log("Error occured"); alert("Technical error");}
		  }).error(function(err){
			  throw err;
			  console.log("error occured");
		  });
		  
		  
	  }
	  
	  $scope.endRideClick = function(demail,did,cid){
		  $http({
			  method:"POST",
			  url:'/endRideFunction',
			  data:{"demail":demail,"did":did,"cid":cid}
	  }).success(function(data){
		  if(data.statusCode === 200)
		  {
		  console.log("end ride result"+JSON.stringify(data));
		 
		  //windows.location = '/billingDriver';
		  ///////////////////////post for billing///////////////////////////////////
		  		$http({
		  			method:"POST",
		  			url:"/billingDriver",
		  			data:{'demail':demail,'did':did,'cid':cid,'rideid':data.rideid}
		  		}).success(function(data1){
		  			if(data1.statusCode === 200)
		  				{
		  					alert(JSON.stringify(data1));
		  					socket.emit("End Ride",{demail:demail,did:did,cid:cid,rideid:data1.rideid});
		  					alert("ride completed. Switching to billing.");
		  					window.location = '/showBill';
		  				}
		  			
		  		}).error(function(err){
		  			throw err;
		  			console.log("Throwing Err: " + err);
		  		});
		  
		  /////////////////////////////////////////////////////////////////////////
		  }
		  else if(data.statusCode === 401)
		  {
			  alert("error code");
		  }
	  }).error(function(err){
		  throw err;
		  console.log("error");
	  });
	  }
	  /********End of changes******/////////////////////////////////////////////////
});


driverHomeApp.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();
    console.log("socket created");
 
    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }
 
            socket.on(eventName, wrapper);
 
            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },
 
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);