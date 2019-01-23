
var app = angular.module('AdminApp', ['ngRoute','highcharts-ng','ui.bootstrap']);
   app.config(['$routeProvider','$locationProvider' ,  function( $routeProvider,$locationProvider) {
    	  $locationProvider.html5Mode(true);
        $routeProvider.
	        when('/ShowCustomerReq', 
	              { templateUrl: '/views/ShowCustReq.html',
	        		controller : 'addCustCtrl'
	              }).
	        when('/ShowDriverReq', 
	    	        { templateUrl: '/views/ShowDriverReq.html',
	    	         controller : 'addDriverCtrl'
	    	         }).
	         when('/SearchDriver', 
		    	        { templateUrl: '/views/SearchDriver.html',
		    	         controller : 'SearchDriverCtrl'
		    	         }).
	         when('/SearchCustomer', 
		    	        { templateUrl: '/views/SearchCustomer.html',
		    	         controller : 'SearchCustomerCtrl'
		    	         }).
		    when('/ShowGraphs', 
		    		   { templateUrl: '/views/graph.html',
		    		 	 controller : 'GraphsCtrl'
		    		   	}).		         
            when('/DriverReview', 
              { templateUrl: '/views/DriverReview.html',
            	controller : 'DriverReviewCtrl'
              }).
              when('/CustomerReview', 
                      { templateUrl: '/views/CustomerReview.html',
                    	controller : 'CustomerReviewCtrl'
                      }).
              when('/SearchBills', 
              { templateUrl: '/views/SearchBills.html',
            	  controller:'displaybillsctrl'
              }).
              when('/ShowStats', 
                      { templateUrl: '/views/stats.html',
            	  		controller : 'StatsCtrl'
                      }).
              when('/UpdateProfile', 
                      { templateUrl: '/views/profile.html',
                      }).
              when('/showdriverdetails/:id',
            		     { templateUrl: '/views/ShowDriverDetails.html',
            	  			controller : 'ShowDriverDetailsCtrl'
            		     }).
                         when('/detailedBill/:id',
                    		     { templateUrl: '/views/bill.ejs',
                    	  			controller : 'ShowDetailedBillCtrl'
                    		     });
        }]);


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
   
   

   app.controller('addCustCtrl', function($scope,$http) {
   	alert("Inside controller");	 	 	 
   	$scope.ShowCustomerReq = function() {
   		    	$http({
   		            method: 'GET',
   		            url: '/customerreq',
   		            }).success(function(response){
   		           		alert(response);
   		           		$scope.results= response;
   		           //Number of pager buttons to show
   	   		          $scope.viewby = 10;
   	   		          $scope.totalItems = $scope.results.length;
   	   		          $scope.currentPage = 1;
   	   		          $scope.itemsPerPage = $scope.viewby;
   	   		          $scope.maxSize = 5;
   	   		          alert($scope.totalItems);
   	   		          $scope.setPage = function (pageNo) {
   	   		   	            $scope.currentPage = pageNo;
   	   		   	          };

   	   		   	          $scope.pageChanged = function() {
   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
   	   		   	          };

   	   		   	        $scope.setItemsPerPage = function(num) {
   	   		   	          $scope.itemsPerPage = num;
   	   		   	          $scope.currentPage = 1; //reset to first paghe
   	   		   	        }
   	   		      
   	   		      //     	
   		        }).error(function(error){
   		            alert("ERROR VIEWING PENDING CUSTOMER REQUEST");
   		        });
   		    };
   		    
   		 $scope.ShowCustomerReq(); 
   		    
   		    $scope.approveCust = function(cid) {	
   		 	 	$http({
   			            method: 'POST',
   			            url:  '/approvecust',
   			            data: {"c_id": cid }
   			            }).success(function(response){
   			           		 alert("Accepted");
   			           		 $scope.ShowCustomerReq();
   				       			 }).error(function(error){
   				           		alert("ERROR APPROVING");
   				       			});
   			 };
   			 
   			   
   			    $scope.denyCust = function(cid) {	
   			 	 	$http({
   				            method: 'POST',
   				            url:  '/denycust',
   				            data: {"c_id": cid }
   				            }).success(function(response){
   				           		 alert("Removed Customer");
   				           		 $scope.ShowCustomerReq();
   					       			 }).error(function(error){
   					           		alert("ERROR DENYING");
   					       			});
   				 };		    
   			    
   		    
   });
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////

   app.controller('addDriverCtrl', function($scope,$http) {
   	alert("Inside controller");	 	 	 
   	$scope.ShowDriverReq = function() {
   		    	$http({
   		            method: 'GET',
   		            url: '/driverreq',
   		            }).success(function(response){
   		           		$scope.results= response;
   		           //Number of pager buttons to show
   	   		          $scope.viewby = 10;
   	   		          $scope.totalItems = $scope.results.length;
   	   		          $scope.currentPage = 1;
   	   		          $scope.itemsPerPage = $scope.viewby;
   	   		          $scope.maxSize = 5;
   	   		          alert($scope.totalItems);
   	   		          $scope.setPage = function (pageNo) {
   	   		   	            $scope.currentPage = pageNo;
   	   		   	          };

   	   		   	          $scope.pageChanged = function() {
   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
   	   		   	          };

   	   		   	        $scope.setItemsPerPage = function(num) {
   	   		   	          $scope.itemsPerPage = num;
   	   		   	          $scope.currentPage = 1; //reset to first paghe
   	   		   	        }
   	   		      
   	   		      //     	
   		           		
   		        }).error(function(error){
   		            alert("ERROR VIEWING PENDING DRIVER REQUEST");
   		        });
   		    };
   		    
   		 $scope.ShowDriverReq(); 
   		    
   		    $scope.approveDriver = function(cid) {	
   		 	 	$http({
   			            method: 'POST',
   			            url:  '/approvedriver',
   			            data: {"d_id": cid }
   			            }).success(function(response){
   			           		 alert("Accepted");
   			           		 $scope.ShowDriverReq();
   				       			 }).error(function(error){
   				           		alert("ERROR APPROVING");
   				       			});
   			 };
   			 
   			   
   			    $scope.denyDriver = function(cid) {	
   			 	 	$http({
   				            method: 'POST',
   				            url:  '/denydriver',
   				            data: {"d_id": cid }
   				            }).success(function(response){
   				           		 alert("Removed");
   				           		 $scope.ShowDriverReq();
   					       			 }).error(function(error){
   					           		alert("ERROR DENYING");
   					       			});
   				 };		    

   });
   
   
///////////////////////////////////////////////////////////////////////////////////////////////////////////

   app.controller('CustomerReviewCtrl', function($scope,$http) {
	   $scope.max = 5;
	   $scope.ratingVal = 4;
	   $scope.readonly = false;
	   	$scope.ShowCustomerReq = function() {
	   		    	$http({
	   		            method: 'GET',
	   		            url: '/customerreview',
	   		            }).success(function(response){
	   		           		alert(JSON.stringify(response));
	   		           		$scope.results= response;
	   		     		/////
	 	   		           //Number of pager buttons to show
	 	   	   		          $scope.viewby = 10;
	 	   	   		          $scope.totalItems = $scope.results.length;
	 	   	   		          $scope.currentPage = 1;
	 	   	   		          $scope.itemsPerPage = $scope.viewby;
	 	   	   		          $scope.maxSize = 5;
	 	   	   		          alert($scope.totalItems);
	 	   	   		          $scope.setPage = function (pageNo) {
	 	   	   		   	            $scope.currentPage = pageNo;
	 	   	   		   	          };

	 	   	   		   	          $scope.pageChanged = function() {
	 	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	 	   	   		   	          };

	 	   	   		   	        $scope.setItemsPerPage = function(num) {
	 	   	   		   	          $scope.itemsPerPage = num;
	 	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	 	   	   		   	        }
	 	   	   		      
	 	   	   		      //     		
	 	   		           		/////
	   		        }).error(function(error){
	   		            alert("ERROR REVIEWING DRIVER");
	   		        });
	   		    };
	   		    
	   		 $scope.ShowCustomerReq();
	   		 	 
	   });

   /////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   
   
   //////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   
   app.controller('SearchDriverCtrl', function($scope,$http) {
		  
	   $scope.ShowDriver = function() {
		    	$http({
		            method: 'GET',
		            url: '/showdriver',
		            }).success(function(response){
		           		alert(JSON.stringify(response));
		           		$scope.results= response;
		           	//Number of pager buttons to show
		   		          $scope.viewby = 10;
		   		          $scope.totalItems = $scope.results.length;
		   		          $scope.currentPage = 1;
		   		          $scope.itemsPerPage = $scope.viewby;
		   		          $scope.maxSize = 5;
		   		          alert($scope.totalItems);
		   		          $scope.setPage = function (pageNo) {
		   		   	            $scope.currentPage = pageNo;
		   		   	          };

		   		   	          $scope.pageChanged = function() {
		   		   	            console.log('Page changed to: ' + $scope.currentPage);
		   		   	          };

		   		   	        $scope.setItemsPerPage = function(num) {
		   		   	          $scope.itemsPerPage = num;
		   		   	          $scope.currentPage = 1; //reset to first paghe
		   		   	        }
		   		      
		   		      //     		
		        }).error(function(error){
		            alert("ERROR REVIEWING DRIVER");
		        });
		    };
		    
		 $scope.ShowDriver();
	   
	   $scope.denyDriver = function(cid) {	
		 	 	$http({
			            method: 'POST',
			            url:  '/denydriver',
			            data: {"d_id": cid }
			            }).success(function(response){
			           		 alert("Removed Driver");
			           		 $scope.ShowDriver();
				       			 }).error(function(error){
				           		alert("ERROR DENYING");
				       			});
			 };
 			 
 });
   
   
   
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   
   
   app.controller('SearchCustomerCtrl', function($scope,$http) {
	  
	   		 alert("inshow customer angular controller");
	   		 
			  $scope.ShowCustomer = function() {
			    	$http({
			            method: 'GET',
			            url: '/showcustomer',
			            }).success(function(response){
			           		alert(JSON.stringify(response));
			           		$scope.results= response;
			           		//
			           	//Number of pager buttons to show
			   		          $scope.viewby = 10;
			   		          $scope.totalItems = $scope.results.length;
			   		          $scope.currentPage = 1;
			   		          $scope.itemsPerPage = $scope.viewby;
			   		          $scope.maxSize = 5;
			   		          alert($scope.totalItems);
			   		          $scope.setPage = function (pageNo) {
			   		   	            $scope.currentPage = pageNo;
			   		   	          };

			   		   	          $scope.pageChanged = function() {
			   		   	            console.log('Page changed to: ' + $scope.currentPage);
			   		   	          };

			   		   	        $scope.setItemsPerPage = function(num) {
			   		   	          $scope.itemsPerPage = num;
			   		   	          $scope.currentPage = 1; //reset to first paghe
			   		   	        }
			   		      
			   		      //     		
			           		//
			        }).error(function(error){
			            alert("ERROR REVIEWING DRIVER");
			        });
			    };
			    
			 $scope.ShowCustomer();
	   
	   		 $scope.denyCust = function(cid) {	
			 	 	$http({
				            method: 'POST',
				            url:  '/denycust',
				            data: {"c_id": cid }
				            }).success(function(response){
				           		 alert("Removed Customer");
				           		 $scope.ShowCustomer();
					       			 }).error(function(error){
					           		alert("ERROR DENYING");
					       			});
				 };	
	   			 
	   });
   
   
   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
   
   app.controller('DriverReviewCtrl', function($scope,$http) {
	   $scope.max = 5;
	   $scope.ratingVal = 4;
	   $scope.readonly = false;
	   	$scope.ShowCustomerReq = function() {
	   		    	$http({
	   		            method: 'GET',
	   		            url: '/driverreview',
	   		            }).success(function(response){
	   		           		alert(JSON.stringify(response));
	   		           		$scope.results= response;
	   		           		/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 10;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
	   		        }).error(function(error){
	   		            alert("ERROR REVIEWING DRIVER");
	   		        });
	   		    };
	   		    
	   		 $scope.ShowCustomerReq();
	   		 	 
	   });

   /////////////////////////////////////////////////////////////////////////////////////////////////////////
   app.controller('ShowDriverDetailsCtrl', function($scope,$http,$routeParams) {
	  var i  = $routeParams.id;
	  alert(i);
	  $scope.ShowDriverDetails = function() {
		    	$http({
		    		method: 'POST',
		            url:  '/showdriverdetails',
		            data: {"d_id": i }
		            }).success(function(response){
		           		alert((response));
		           		$scope.results= response;
		        }).error(function(error){
		            alert("ERROR REVIEWING DRIVER");
		        });
		    };
		    
		 $scope.ShowDriverDetails(); 
	  
	  
	   });
   
   ////////////////////////////////////////////////////////////////////////////////////////////////////////// 

	 app.controller('ShowDetailedBillCtrl', function($scope,$http,$routeParams) {
		  var i  = $routeParams.id;
		  alert(i);
		 // $scope.detailedBill = function() {
			    	$http({
			    		method: 'POST',
			            url:  '/detailedBillView',
			            data: {"b_id": i }
			            }).success(function(response){
			           		alert("detailed Bill"+JSON.stringify(response));
			           		$scope.billdata= response.data;
			           		
			           		
			           		alert("Mapss" + $scope.billdata.origin + " " + $scope.billdata.destination);
				    		var url = "https://maps.googleapis.com/maps/api/staticmap?size=480x480";
				    		var key = "key=AIzaSyCj_Nbn9F1IL5ZUIrWX91ge_sAqZ2iJoZY";
				    		var maptype = "maptype=roadmap";
				    		var path = "path=color:0x0000ff|weight:5|"+$scope.billdata.origin+"|"+$scope.billdata.destination;
				    		var marker = "markers="+$scope.billdata.origin+"|"+$scope.billdata.destination; 
				    		var finalPath = url+"&"+maptype+"&"+marker+"&"+path+"&"+key;
				    		$scope.finalPath=finalPath;
				    		console.log(finalPath);
				    		
			        }).error(function(error){
			            alert("ERROR REVIEWING DRIVER");
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
			   // };
			    
			 //$scope.ShowDriverDetails(); 
		  
		  
		   }); 
 
/////////////////////////////////////////////////////////////////////////////////////////////////////////////  
 //////////////////////////////////////////////////////////////////////////////////////////////////////////  
   app.controller('StatsCtrl', function($scope,$http) {
	   $scope.hidethis = "true";	
	   
	   $scope.ShowDriverDetails = function(s,d) {
		   
	      	   $scope.chartConfig = {
	      		        options: {
	      		            chart: {
	      		                type: 'line',
	      		                
	      		            }
	      		        },
	      		         series: [{
	      		           /* data: (function () {
	      		                var data = [], date = new Date(), i;

	      		                for (i = 0; i <= 5; i += 1) {
	      		                    data.push([
	      		                      date + i,
	      		                      firstdata[i]
	      		                    ]);
	      		                }
	      		                return data;
	      		            }()),*/
	      		          //  pointStart: Date.UTC(2015, 0, 1),
	      		        	 data : s,
	      		          //  pointInterval: 24 * 3600 * 1000 // one day
	      		        }],
	      		        title: {
	      		            text: 'Chart'
	      		        },
	      		        xAxis: {
	      		        
	      		          categories: d
	      		        },
	      		        loading: false
	      		    }
	   			}
	   
	   //$scope.ShowDriverDetails(); 
	   $scope.showstats = function() {
		   
	    	$http({
	    		method: 'POST',
	            url:  '/showstats',
	            data: {"fromdate": $scope.fromdate , "todate" : $scope.todate , "selected" : $scope.stats }
	            }).success(function(response){
	            	alert(JSON.parse(response.result).length);
		            var	results= JSON.parse(response.result);
		           	var s =[],d=[], i=0;
		           	for(i=0; i<JSON.parse(response.result).length ; i++){
		           		s.push(results[i].Revenue);
		           		d.push(results[i].billingdate.substring(0,10));
		          // 		alert(d[i]);
		           	}
	            $scope.ShowDriverDetails(s,d); 
	                }).error(function(error){
	            alert("ERROR REVIEWING DRIVER");
	        });
	    };  
	   
	   
	 
});
   
   
   /////////////////////////////
   app.controller('displaybillsctrl', function($scope,$http) {
	   
       $scope.ShowBills = function() {
   		    	$http({
   		            method: 'GET',
   		            url: '/displaybill',
   		            }).success(function(response){
   		           		alert("show bill"+JSON.stringify(response));
   		           		$scope.results= response;
						/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 100;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
   		        }).error(function(error){
   		            alert("ERROR REVIEWING BILL");
   		        });
   		    };
   		    
   		 $scope.ShowBills();
   		 
   		$scope.searchdate = function() {
   			$http({
	            method: 'POST',
	            url: '/searchdate',
	            data:{"date1":$scope.date1,"date2":$scope.date2}
	            }).success(function(response){
	           		alert("date"+JSON.stringify(response));
	           		$scope.results= JSON.parse(response.result);
					/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 10;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
	        }).error(function(error){
	            alert("ERROR REVIEWING SEARCH");
	        });
	    };
	    
	 //$scope.searchdate(); 
	 
	 $scope.searchmonth = function() {
	    	$http({
	            method: 'POST',
	            url: '/searchmonth',
	            data:{"month":$scope.month}
	            }).success(function(response){
	           		alert("month"+JSON.stringify(response));
	           		$scope.results= JSON.parse(response.result);
					/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 10;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
	        }).error(function(error){
	            alert("ERROR REVIEWING SEARCH");
	        });
	    };
	    
	// $scope.searchmonth(); 
	 
	 $scope.searchyear = function() {
		 $http({
	            method: 'POST',
	            url: '/searchyear',
	            data:{"years":$scope.years}
	            }).success(function(response){
	           		alert("year"+JSON.stringify(response));
	           		$scope.results= response;
					/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 10;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
	        }).error(function(error){
	            alert("ERROR REVIEWING SEARCH");
	        });
	    };
	    
	 //$scope.searchyear();
	 
	 $scope.searchbillid = function() {
		 $http({
	            method: 'POST',
	            url: '/searchbillid',
	            data:{"billid":$scope.billid}
	            }).success(function(response){
	           		alert("serach bill id "+JSON.stringify(response));
	           		$scope.results= response;
					/////
	   		           //Number of pager buttons to show
	   	   		          $scope.viewby = 10;
	   	   		          $scope.totalItems = $scope.results.length;
	   	   		          $scope.currentPage = 1;
	   	   		          $scope.itemsPerPage = $scope.viewby;
	   	   		          $scope.maxSize = 5;
	   	   		          alert($scope.totalItems);
	   	   		          $scope.setPage = function (pageNo) {
	   	   		   	            $scope.currentPage = pageNo;
	   	   		   	          };

	   	   		   	          $scope.pageChanged = function() {
	   	   		   	            console.log('Page changed to: ' + $scope.currentPage);
	   	   		   	          };

	   	   		   	        $scope.setItemsPerPage = function(num) {
	   	   		   	          $scope.itemsPerPage = num;
	   	   		   	          $scope.currentPage = 1; //reset to first paghe
	   	   		   	        }
	   	   		      
	   	   		      //     		
	   		           		/////
	        }).error(function(error){
	            alert("ERROR REVIEWING SEARCH");
	        });
	    };
	    
	 //$scope.searchbillid();
	 
	 
	   $scope.delsearch = function(bid) {	
		 	$http({
		            method: 'POST',
		            url:  '/delBill',
		            data: {"b_id": bid }
		            }).success(function(response){
		           		 alert("Removed data");
		           		 $scope.ShowBills();
			       			 }).error(function(error){
			           		alert("ERROR DENYING");
			       			});
		 };
		 $scope.delsearch();
   			 
   });


//////////////////////////////////////////GRAPHS//////////////////////////////////////////////////////////

   app.controller('GraphsCtrl', function($scope,$http) {
	  alert("in graphs");
	  $scope.ShowGraphs = function() {
		    	$http({
		    		method: 'GET',
		            url:  '/showgraphs',
		            }).success(function(response){
		           		alert(response);
		           		$scope.results= JSON.parse(response.data);
		        }).error(function(error){
		            alert("ERROR LOADING GRAPHS");
		        });
		    };
		    
		// $scope.ShowGraphs(); 
		  $scope.DriverRides = function() {
			  alert("Driverrides" + $scope.d_fname + $scope.d_lname);
			  
			  if ($scope.d_fname == null){
				  alert("Driver First name should not be empty");
				  return;
			  }
			  
			  if ($scope.d_fname == null){
				  alert("Driver Last name should not be empty");
				  return;
			  }
		    	$http({
		    		method: 'POST',
		            url:  '/DriverRides',
		            data: {"driver_fname" : $scope.d_fname ,"driver_lname" : $scope.d_lname  }
		            }).success(function(response){
		            	
		           		alert(JSON.parse(response.result_driver));
		           		$scope.Driverdetails= JSON.parse(response.result_driver);
		           		results= JSON.parse(response.result_driver);
		           		alert(results.length);
		           		if (results.length > 0){	
		    			var path = "path=color:0x0000ff|weight:5"; 
		    			var marker = "markers=color:green"; 
		    			var zoom = "zoom=8";
		    			for(var i = 0; i<results.length; i++)
		    				{
		    					path = path + "|" +  results[i].origin + "|" + results[i].destination;
		    					marker = marker + "|" +  results[i].origin + "|" + results[i].destination;
		    				}
		    			
		    		
		    		var url = "https://maps.googleapis.com/maps/api/staticmap?size=640x640";
		    		var key = "key=AIzaSyCj_Nbn9F1IL5ZUIrWX91ge_sAqZ2iJoZY";
		    		var maptype = "maptype=roadmap";
		    		$scope.finalPath = url+"&" +zoom + "&" +maptype+"&"+marker+"&"+path+ "&"+key;
		    		console.log($scope.finalPath);
		    		alert($scope.finalPath);
		           		}
		           		else 
		           			{
		           			alert("No rides found for this driver!!! ")
		           			}
		           				
		           		///
		        }).error(function(error){
		            alert("ERROR LOADING GRAPHS FOR DRIVER");
		        });
		    };
	  
		    
		    $scope.CustomerRides = function() {
				  alert("Customerrides" + $scope.c_fname + $scope.c_lname);
				  
				  if ($scope.c_fname == null){
					  alert("Customer First name should not be empty");
					  return;
				  }
				  
				  if ($scope.c_fname == null){
					  alert("Customer Last name should not be empty");
					  return;
				  }
			    	$http({
			    		method: 'POST',
			            url:  '/CustomerRides',
			            data: {"customer_fname" : $scope.c_fname ,"customer_lname" : $scope.c_lname  }
			            }).success(function(response){
			            
			            	
			           		alert(JSON.parse(response.result_customer));
			           		results= JSON.parse(response.result_customer);
			           		$scope.Customerdetails = JSON.parse(response.result_customer);
			           		alert(results.length);
			           		if (results.length > 0){	
			    			var path = "path=color:0x0000ff|weight:5"; 
			    			var marker = "markers=color:green"; 
			    			var zoom = "zoom=10";
			    			for(var i = 0; i<results.length; i++)
			    				{
			    					path = path + "|" +  results[i].origin + "|" + results[i].destination;
			    					marker = marker + "|" +  results[i].origin + "|" + results[i].destination;
			    				}
			    			
			    		
			    		var url = "https://maps.googleapis.com/maps/api/staticmap?size=640x640";
			    		var key = "key=AIzaSyCj_Nbn9F1IL5ZUIrWX91ge_sAqZ2iJoZY";
			    		var maptype = "maptype=roadmap";
			    		$scope.finalPath = url+"&" +zoom + "&" +maptype+"&"+marker+"&"+path+ "&"+key;
			    		console.log($scope.finalPath);
			    		alert($scope.finalPath);
			           		}
			           		else 
			           			{
			           			alert("No rides found for this customer!!! ")
			           			}
			           				
			           		///
			        }).error(function(error){
			            alert("ERROR LOADING GRAPHS FOR CUSTOMER");
			        });
			    };
		  
			    $scope.AreaRides = function() {
					  alert("Area" + $scope.area);

					  if ($scope.area == null){
						  alert("Area should not be empty");
						  return;
					  }
					  
				    	$http({
				    		method: 'POST',
				            url:  '/AreaRides',
				            data: {"area" : $scope.area  }
				            }).success(function(response){
				            	
				           		alert(JSON.parse(response.result_customer));
				           		results= JSON.parse(response.result_customer);
	
				           		alert(results.length);
				           		if (results.length > 0){	
				    			var path = "path=color:0x0000ff|weight:5"; 
				    			var marker = "markers=color:green"; 
				    			var zoom = "zoom=10";
				    			for(var i = 0; i<results.length; i++)
				    				{
				    					path = path + "|" +  results[i].origin + "|" + results[i].destination;
				    					marker = marker + "|" +  results[i].origin + "|" + results[i].destination;
				    				}
				    			
				    		
				    		var url = "https://maps.googleapis.com/maps/api/staticmap?size=640x640";
				    		var key = "key=AIzaSyCj_Nbn9F1IL5ZUIrWX91ge_sAqZ2iJoZY";
				    		var maptype = "maptype=roadmap";
				    		$scope.finalPath = url+"&" +zoom + "&" +maptype+"&"+marker+"&"+path+ "&"+key;
				    		console.log($scope.finalPath);
				    		alert($scope.finalPath);
				           		}
				           		else 
				           			{
				           			alert("No rides found for this area!!! ")
				           			}
				           				
				           		///
				        }).error(function(error){
				            alert("ERROR LOADING GRAPHS FOR AREA");
				        });
				    };
			   
	   });

   