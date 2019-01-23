var app = angular.module('customerHome', ['ngMap']);


app.controller('rideControl', function($scope, $compile, $http, socket, $sce) {
	
	$scope.availableDrivers = "true";
	$scope.selectedDriver = "true";
	var c_lat;
	var c_lng;
	$scope.pos = "current-location";
	$scope.dpos = "";
	$scope.driverdata = {};
	var vm = this;
	$scope.posarr = [];
	$scope.url = "";
	///Added 30.11.2015//////
	var a = "";
	$scope.selectDriverFlag = false;
	////////////////////////
	
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
		console.log(position);
		alert("You have clicked on Position[" + position.latLng.lat()
				+ ", " + position.latLng.lng() + "]"+position.formatted_address);
		
		//c_lat = position.latLng.lat();
		//c_lng = position.latLng.lng();
		
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
		        $scope.pos = results[1].formatted_address;
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
	       $scope.place.geometry.location.lng(),$scope.place
	     );	
	     console.log($scope.pos);
	     $scope.pos = $scope.place.geometry.location.lat() + "," + $scope.place.geometry.location.lng();
	     console.log($scope.pos);
	     //vm.map.setCenter(vm.place.geometry.location);
	   };
	   
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
		   };
		   
		  
		   $scope.setPickup = function(evt){
			   
			   $scope.availableDrivers = "false";
			   $scope.selectedDriver = "true";
			   
			   //alert("currentloc lat inside setpickup" + c_lat + "currentloc long" + c_lng );
			  alert("pos in setPickup "+$scope.pos);
			 // alert("position in setPickup  "+position);
			  var comp = $scope.pos;
			  ////////////////////current position pranav///////////////////
			  if($scope.pos === comp)
			   {
				   /*if (navigator.geolocation) {*/
				    navigator.geolocation.getCurrentPosition(function(position) {
				      var pos = {
				        lat: position.coords.latitude,
				        lng: position.coords.longitude
				      };
				      alert("this is it in if");
				      $scope.pos = pos.lat+","+pos.lng;
				      c_lat = pos.lat;
				      c_lng = pos.lng;
				      alert($scope.pos);
				      alert("c_lat "+c_lat);
				      alert("c_lng "+c_lng);
				      
				      //////http///////////
				      
				      $http({
							method:"POST",
							url:"/getOnlineDrivers",
						data : {"c_lat" : c_lat , "c_lng" : c_lng  }	
						}).success(function(data){
							$scope.results=data;
							
							if (data.statusCode === 401) {
			    				console.log("ang err");
			    				
			    			alert("fails");
			    			}
			    			else if(data.statusCode === 200){
			    				$scope.ShowCustomerReq();
			    				console.log("ang succ");
			    				alert("success");
			    				alert("rad"+JSON.stringify(data.data1));
			    				$scope.driverdata = data.data1;
			    				$scope.showmarkers = $scope.driverdata ;
			    				console.log("Driver Data"+JSON.stringify($scope.driverdata));
			    			}
			    		}).error(function(error) {
			    			alert(error);
			    		});
				      
				      /////////////////end http/////////////
				      
				    }, function() {
				      alert("error");
				    });
				 /* } else {
				    // Browser doesn't support Geolocation
				    alert("Browser doesn't support geolocation");
				  }*/
			   }			  
			  
			  ////////////////////////////////////////////////////////////////
			  
			  
			   
			  console.log("evt"+evt);
			  
				///////////////////moved from here//////////////////////
			  
			 
				
			  //$scope.pos;
				
				//$scope.ShowCustomerReq();
			  
		   }
		   
		   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		   
		   $scope.startRide = function(id,email,dfname,dlname,cid)
		   {
			   $scope.availableDrivers = "true";
				$scope.selectedDriver = "false";
				
			   console.log("your selected driver's id is: "+id);
			   
			   $http({
					method:"POST",
					url:"/requestRide",
					data: {"id":id}
				}).success(function(data){
					$scope.results=data;
					console.log("results....."+JSON.stringify(data));
					if (data.statusCode === 401) {
	    				console.log("ang err");
	    				
	    			alert("fails");
	    			}
	    			else if(data.statusCode === 200){
	    				
	    				console.log("ang succ");
	    				alert("success");
	    				$scope.selecteddriver = JSON.parse(data.data);
	    				$scope.showmarkers = $scope.selecteddriver;
	    				console.log("show markers - "+$scope.showmarkers);
	    				console.log("Selected Driver Data"+JSON.stringify($scope.selecteddriver));
	    			}
	    		}).error(function(error) {
	    			alert(error);
	    		});
			   
			   ////////////Create Ride///////////Pranav/////////////////////////////////////////////
			   console.log(id + " "+ email);
			   if($scope.pos === "")
				   {
				   alert("Please enter origi of your ride or click get available drivers");
				   }
			   else
				   {
				   if(($scope.pos === "current-location") && ($scope.dpos != ""))
					   {
					   		if (navigator.geolocation) {
						    navigator.geolocation.getCurrentPosition(function(position) {
						      var pos = {
						        lat: position.coords.latitude,
						        lng: position.coords.longitude
						      };
						      alert("this is it");
						      $scope.pos = pos.lat+","+pos.lng;
						      alert($scope.pos);
						    }, function() {
						      alert("error");
						    });
						  } else {
						    // Browser doesn't support Geolocation
						    alert("Browser doesn't support geolocation");
						  }
					   		
					   		NgMap.getGeoLocation($scope.pos).then(function(latlng){
					   			//console.log(latlng.lat()+","+latlng.lng());
					   			$scope.pos=latlng.lat()+","+latlng.lng();
					   			alert("You can resquest ride now");
								   $http({
									   method:"POST",
									   url:"/requestrideCustomer",
									   data:{"d_id":id, "d_emailid":email,"d_fname":dfname,"d_lname":dlname,"origin":$scope.pos,"destination":$scope.dpos}
								   }).success(function(data){
									   console.log(JSON.stringify(data));
									   $scope.selectDriverFlag = true;
									   socket.emit('check request',{id:id,cid:cid});  
								   }).error(function(err){
									   throw err;
								   });
								   
					   		});
					   		
					   }
				   else if(($scope.pos != "current-location") && ($scope.dpos != ""))
					   {
					   $http({
						   method:"POST",
						   url:"/requestrideCustomer",
						   data:{"d_id":id, "d_emailid":email,"d_fname":dfname,"d_lname":dlname,"origin":$scope.pos,"destination":$scope.dpos}
					   }).success(function(data){
						   console.log(JSON.stringify(data));
						   $scope.selectDriverFlag = true;
						   socket.emit('check request',{id:id,cid:cid});
					   }).error(function(err){
						   throw err;
					   });
					  
					   }
				   else if($scope.dpos === "")
					   {
					   alert("Please enter destination");
					   }
				   }
			   //////////////////////////////End of create ride////////////////////////////////////////////
			   
		   }
		   
		   
		   $scope.viewDriver = function(id)
		   {
			   
			   console.log("view driver's id is: "+id);
			   
			   $http({
					method:"POST",
					url:"/viewDriver",
					data: {"id":id}
				}).success(function(data){
					$scope.results=data;
					console.log("results....."+JSON.stringify(data));
					if (data.statusCode === 401) {
	    				console.log("ang err");
	    				
	    			alert("fails");
	    			}
	    			else if(data.statusCode === 200){
	    				
	    				console.log("ang succ");
	    				
	    				$scope.viewdriver = JSON.parse(data.data);
	    				$scope.url = $scope.viewdriver.d_video;
	    				//$scope.url = $scope.url.replace("watch?v=","v/");
	    				console.log("show markers - "+$scope.showmarkers);
	    				console.log("Selected Driver Data"+JSON.stringify($scope.viewdriver));
	    			}
	    		}).error(function(error) {
	    			alert(error);
	    		}); 
		   }
		   
		   $scope.trustSrc = function(src) {
			    return $sce.trustAsResourceUrl(src);
			  }
		   
		   $scope.cancelRide = function()
		   {
			   if (confirm("Are You Sure to Cancel Ride?") == true) {
				   
				   $scope.availableDrivers = "false";
				   $scope.selectedDriver = "true";
				   $scope.showmarkers = $scope.driverdata;
			    } else {
			    
			    	$scope.availableDrivers = "true";
					$scope.selectedDriver = "false";
			    }
			   
			   /*$scope.availableDrivers = "false";
				$scope.selectedDriver = "true";
			   alert("in cancel ride");
			   $scope.name = 'World';*/
		   }
		   
		   
///////////////////////////////////// RATINGS  /////////////////////////
			
			 	$scope.max = 5;
			   $scope.ratingVal = 4;
			   $scope.readonly = false;
			   	$scope.ShowCustomerReq = function() {
			   		    	$http({
			   		            method: 'GET',
			   		            url: '/driverreviewride',
			   		            }).success(function(response){
			   		           		alert("rating"+response);
			   		           		$scope.xyzs= response;
			   		        }).error(function(error){
			   		            alert("ERROR REVIEWING DRIVER");
			   		        });
			   		    };
			   		    
			  // $scope.ShowCustomerReq();  		 
			   		 
////////////////////////////////////////////////////////////////////////// 
		   
/************Socket Implementation **************/
			   		   console.log("Flag" + $scope.selectDriverFlag)
			 		  
					   socket.on('request accepted',function(msg){
						   if($scope.selectDriverFlag === true){
						  alert(msg.msg);
						  console.log(JSON.stringify(msg));
						   }
					   });
					   
					  socket.on('ride started',function(msg){
						 if($scope.selectDriverFlag === true){
							 alert(msg.msg);
							 console.log(JSON.stringify(msg));
						 } 
					  });
					  
					  socket.on('End Ride',function(msg){
						  if($scope.selectDriverFlag === true){
							  alert(msg.msg);
							  console.log(JSON.stringify(msg));
							  $http({
								  method:'POST',
								  url:'/displayBill',
								  data:{did:msg.did,cid:msg.cid,rideid:msg.rideid}
							  }).success(function(data){
								  if(data.statusCode === 200){
									  window.location = '/displayCustomerBill';
								  }
								  else if(data.statusCode === 401){
									  alert('Technical Error. Please login again');
								  }
							  }).error(function(err){
								  throw err;
								  alert("Technical Alert");
							  });
							  //window.assign.location('/customerBilling');
						  }
					  });  		    
			   		    
});


app.directive('star', function () {
	   return {
		    template: '<ul class="rating">' +
		        '<li ng-repeat="star in stars" ng-class="star" >' +
		        '\u2605' +
		        '</li>' +
		        '</ul>',
		    scope: {
		      ratingValue: '@',
		      max: '@',
		      readonly: '@',
		    },
		   
		    link: function (scope, elem, attrs) {
		      elem.css("text-align", "center");
		      var updateStars = function () {
		        scope.stars = [];
		        for (var i = 0; i < scope.max; i++) {
		          scope.stars.push({
		            filled: i < scope.ratingValue
		          });
		        }
		      };
		      updateStars();
		     
		    }
		  };
	});


app.factory('socket', ['$rootScope', function ($rootScope) {
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


/*app.directive('ngConfirmClick', [
                                 function(){
                                     return {
                                         link: function (scope, element, attr) {
                                             var msg = attr.ngConfirmClick || "Are you sure?";
                                             var clickAction = attr.confirmedClick;
                                             element.bind('click',function (event) {
                                                 if ( window.confirm(msg) ) {
                                                     scope.$eval(clickAction)
                                                 }
                                             });
                                         }
                                     };
                             }])
*/
