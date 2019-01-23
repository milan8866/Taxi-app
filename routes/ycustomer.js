var app = require('express');
var ejs = require("ejs");
var mysql =  require('../routes/mysql');
var mq_client = require('../rpc/client');

exports.ride = function(req, res){
		  if(req.session.data){
			res.render('customerRide', {result:req.session.data});
		  }
		  else{
			  res.render('index');
		  }
	};

exports.customerHome = function(req, res){
		if(req.session.data){
	  res.render('customerHome', {result:req.session.data});
		}
		else {res.render('index');}
	};


exports.customerTrips = function(req, res){
		if(req.session.data){
		res.render('customerTrips', {result:req.session.data});
		}
		else{res.render('index');}
	};
	
exports.customerPayment = function(req, res){
		if(req.session.data){
	  res.render('customerPayment', {result:req.session.data});
		}
		else{res.render('index');}
	};
	
exports.creditDetailsUpdate = function(req, res){

		  var c_creditcard = req.param('c_creditcard');
		  var c_cvv = req.param('c_cvv');
		   var c_creditmonth = req.param('c_creditmonth');
		   var c_credityear = req.param('c_credityear');
		  
		  console.log("sessio is "+req.session.data.c_id);
		  
		  var msg_payload={
				  	"c_id":req.session.data.c_id,
				   "c_cvv" : c_cvv,
				   "c_creditcard" : c_creditcard,
				   "c_creditmonth" : c_creditmonth,
				   "c_credityear" : c_credityear,	  
		  };
		  
		  
			mq_client.make_request('creditDetailsUpdate_queue', msg_payload, function(err, results) {

				console.log(results.statusCode);
				if (err) {
					throw err;
				} else {
					if (results.statusCode == 200) {
						console.log("values Inserted");
						req.session.data = results.data[0];
						console.log("Session: " + req.session.data.c_firstname);
						/*res.render('customerHome', {result:results.data});*/
						
						res.send({
							"statusCode" : 200
						});
					} else if(results.statusCode == 401){

						console.log("Error");
						res.send({
							"statusCode" : 401
						});
						
					}
				}
			});
		
	};


exports.customerProfileUpdate = function(req, res){

	  var email = req.param('email');
	  var password = req.param('password');
	  var firstname = req.body['first_name'];
	  var lastname = req.param('last_name');
	  var mobile = req.param('mobile');
	  var address = req.param('address');
	  var city = req.param('city');
	  var state = req.param('state');
	  var zipcode = req.param('zipcode');
	  var currentPassword = req.param('currentPassword');
	  var newPassword = req.param('newPassword');
	  
	  var confirm_newPassword = req.param('confirm_newPassword');
	  if(newPassword!=null)
		  {
		  var final_password=newPassword;
		  }
	  else{
		  final_password=password;
	  }
	  
	  console.log("yscustomer.js sessio is "+req.session.data.c_id);
	  
	  var msg_payload={
			  	"c_id":req.session.data.c_id,
			   "c_emailid" : email,
			   "c_password" : final_password,
			   "c_firstname" : firstname,
			   "c_lastname" : lastname,
			   "c_phone" : mobile,
			   "c_address" : address,
			   "c_city" : city,
			   "c_state" : state,
			   "c_zipcode" : zipcode
	  };
	  
	  
		mq_client.make_request('customerUpdate_queue', msg_payload, function(err, results) {

			console.log(results.statusCode);
			if (err) {
				throw err;
			} else {
				if (results.statusCode == 200) {
					console.log("values Inserted");
					req.session.data = results.data[0];
					console.log("Session: " + req.session.data.c_firstname);
					/*res.render('customerHome', {result:results.data});*/
					
					res.send({
						"statusCode" : 200
					});
				} else if(results.statusCode == 401){

					console.log("Error");
					res.send({
						"statusCode" : 401
					});
					
				}
			}
		});
	
};

/***Pranav 30.11.2015***///
exports.requestride = function(req,res){
	var did = req.param('d_id');
	var demail = req.param('d_email');
	var cid = req.session.data.c_id;
	var cemail = req.session.data.c_emailid;
	var cfname = req.session.data.c_firstname;
	var clname = req.session.data.c_lastname;
	var dfname = req.param('d_fname');
	var dlname = req.param('d_lname');
	var origin = req.param('origin');
	var destination = req.param('destination');
	
	console.log("Data: " + dfname + dlname);
	var msg_payload = {"did":did,"demail":demail,"cid":cid,"cemail":cemail,"cfname":cfname,"clname":clname,"dfname":dfname,"dlname":dlname,"origin":origin,"destination":destination};
	console.log(JSON.stringify(msg_payload));
	mq_client.make_request("customer_ride_queue",msg_payload,function(err,results){
		console.log(JSON.stringify(results));
		if(err)
			{
			throw err;
			console.log("error returned");
			}
		else
			{
				if(results.statusCode === 200)
					{
					res.send({"statusCode":200});
					}
				else if(results.statusCode === 401)
					{
					res.send({"statusCode":401});
					}
			}
	});
}

exports.displayBill = function(req,res){
	var did = req.param('did');
	var cid = req.param('cid');
	var rideid = req.param('rideid');
	
	console.log("Data billing req params: "+ did + " "+cid+" "+rideid);
	var msg_payload = {"did":did,"cid":cid,"rideid":rideid};
	
	mq_client.make_request("cutomer_Billing_queue",msg_payload,function(err,results){
		console.log(JSON.stringify(results));
		if(err)
			{
			throw err;
			console.log("Error returned");
			}
		else
			{
				if(results.statusCode === 200)
					{
					req.session.cbilldata = results.data;
					res.send({"statusCode":200});
					}
				else if(results.statusCode === 401)
					{
					res.send({"statusCode":401});
					}
			}
	});
}

exports.displayCustomerBill = function(req,res){
	if(req.session.cbilldata && req.session.data){
		res.render('riderBill',{data:req.session.data,billdata:req.session.cbilldata});
	}
	else
		{
		res.redirect('/logInCustomer');
		}
}