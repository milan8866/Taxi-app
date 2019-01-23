
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , routes = require('./routes')
  , index = require('./routes/index')
  , user = require('./routes/user')
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , path = require('path')
  , login = require('./routes/login')
  , rider = require('./routes/customerProfile')
  , signup = require('./routes/signup')
  , session = require('client-sessions')
  , ycustomer = require('./routes/ycustomer')
  ,	customer = require('./routes/customer')
  , billing = require('./routes/billing')
  , driver = require('./routes/driver')
  , driverRoutes = require('./routes/driverRoutes')
  ,credentials =  require('./routes/credentials')
  ,image=require('./routes/image');
//image
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs=require('fs');


//mongo session variables

var mongoSessionConnectURL 	= "mongodb://localhost:27017/ubersessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
var mongoURL = 'mongodb://localhost:27017/user';

/*app.use(expressSession({
	secret:'lab2_login',
	resave:false,
	saveUninitialized: false,
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
  }));*/


app.use(session({   
	  
	cookieName: 'session',    
	secret: 'Login_Details',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));

var mysql = require('./routes/mysql');
app.configure(function(){
  app.set('port', process.env.PORT || 4000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/admin',index.admin);
app.get('/user', user.list);
app.get('/sign-up',index.signup);
app.get('/log-in',index.login);
app.get('/signUpCustomer',index.signUpCustomer);
app.get('/signUpDriver',index.signUpDriver);
app.get('/logInCustomer',index.logInCustomer);
app.get('/logInDriver',index.logInDriver);
app.get('/logout',index.logout);
app.get('/dlogout',index.dlogout);

app.get('/ride',ycustomer.ride);
app.get('/customerHome',ycustomer.customerHome);
app.get('/customerTrips',ycustomer.customerTrips);
app.get('/customerPayment',ycustomer.customerPayment);

app.post('/signUpCustomer',credentials.signUpCustomer);
app.post('/logInCustomer',credentials.logInCustomer);

app.post('/customerProfileUpdate',ycustomer.customerProfileUpdate);
app.post('/driverProfileUpdate',driver.driverProfileUpdate);
app.post('/creditDetailsUpdate',ycustomer.creditDetailsUpdate);

/***pranav 30.11.2015**///
//requestrideCustomer
app.post('/requestrideCustomer',ycustomer.requestride);
app.post('/displayBill',ycustomer.displayBill);
app.get('/displayCustomerBill',ycustomer.displayCustomerBill);

///////////////////////NehA

app.get('/customerreq' , customer.addcustomerreq);
app.post('/approvecust' , customer.approvecust);
app.post('/denycust' , customer.denycust);
app.get('/showcustomer',customer.showcustomer);

app.get('/showdriver',driver.showdriver);
app.get('/driverreq' , driver.adddriverreq);
app.post('/approvedriver' , driver.approvedriver);
app.post('/denydriver' , driver.denydriver);
app.get('/driverreview' , driver.driverreview);

////////////////

app.get('/customerreview' , customer.customerreview);
////////////////
app.get('/driverreviewride' , driver.driverreviewride);

app.post('/showdriverdetails' , driver.showdriverdetails);

app.post('/showstats' , customer.showstats);

app.get('/displaybill' , billing.showbills);
//app.post('/searchdate' , billing.searchdate);
app.post('/searchmonth' , billing.searchmonth);
app.post('/searchyear' , billing.searchyear);
app.post('/searchbillid' , billing.searchbillid);
app.post('/delBill',billing.delsearch);
app.post('/detailedBillView',billing.detailedBill);

////Neha new/////////////////////////////

app.get('/getCustomerTrips' , customer.getTrips);
app.get('/getDriverTrips',customer.getDriverTrips);
app.get('/showgraphs' , customer.showgraphs);
app.post('/DriverRides' , customer.DriverRides);
app.post('/CustomerRides' , customer.CustomerRides);
app.post('/AreaRides' , customer.AreaRides);


app.post('/addtorating', driver.addtorating);
app.post('/postreview', driver.postreview);

app.post('/addtoratingCustomer', customer.addtoratingCustomer);
app.post('/postreviewCustomer', customer.postreviewCustomer);

/////////////////////////
///pranav

app.post('/getOnlineDrivers',customer.getOnlineDrivers);
app.post('/requestRide',customer.requestRide);
app.post('/viewDriver',customer.viewDriver);


app.get('/driverlogin',login.driverLogin);
/*app.get('/rider',rider.viewrider);*/
app.get('/customerSignup',signup.customerSignup);
app.get('/driverSignup',signup.driverSignup);
app.post('/driverSignupNext',signup.driverSignupNext);
app.get('/nextstep',signup.nextStep);
app.get('/driverHome/backgroundCheck',signup.backgoundCheck);
app.get('/driverHome/documents',signup.documents);
app.get('/driverHome/welcome',signup.welcome);
app.get('/driverHome/vehicle',signup.nextStep);
app.post('/vehicleUpdated',signup.vehicleUpdated);
app.post('/driverLoginNext',login.driverLoginNext);
app.get('/driverHome/profile',login.driverHome);
app.post('/addSSN',signup.addSSN);

/*****Pranav 30.11.2015******/////
app.get('/goonline',login.driverHome);
app.post('/goonlineDriver',driverRoutes.goonline);
app.post('/goOfflineDriver',driverRoutes.gooffline);
app.post('/startRide',driverRoutes.startRide);
app.post('/endRideFunction',driverRoutes.endRideFunction);
app.post('/billingDriver',driverRoutes.billingDriver);
app.get('/showBill',driverRoutes.showBill);
/*****///////////////////////////

//my get image

app.get('/getImage/:id',customer.getImage);
app.get('/readLicense/:id',image.readLicense);		
//image upload driver
app.post('/upload',image.uploadLicense);
app.post('/uploadRideImage',image.uploadRideImage)

/*
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
*/

/*******Added by pranav *******////

io.on('connection', function(socket){
	  console.log('a user connected');
	  socket.on('check request',function(msg){
		  console.log(JSON.stringify(msg));
		 console.log("check request for id: " + msg.id + msg.cid); 
		 driverRoutes.fetchRequest(msg.id,msg.cid,function(res){
			 if(res)
				 {
				 console.log("Response generated");
				 io.emit("generated status",res);
				 }
			 else
				 {
				 io.emit("error");
				 }
		 });
	  });
	  
	  socket.on('request accepted',function(demail,did,cid){
		 console.log("request arrived");
		 if((did != "")&&(cid != "")){
			 io.emit("request accepted",{msg:"Driver has accepted your request"});
		 }
	  });
	  
	  socket.on('ride started',function(demail,did,cid){
			console.log("client is being notified.");
			if((did != "")&&(cid != "")){
				io.emit('ride started',{msg:"Driver has started your ride. Enjoy..!!"});
			}
		});
	 
	  socket.on('End Ride',function(msg){
		 console.log("Client is being notified about end ride" + msg.rideid + msg.demail + msg.did + msg.cid);
		 if((msg.did != "") && (msg.cid != "")){
			io.emit("End Ride",{msg:"Driver has ended your ride. Thank you for using UBER",rideid:msg.rideid,demail:msg.demail,did:msg.did,cid:msg.cid}); 
		 }
	  });
	  
	});


/*****End of change****////////

mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});