var app = require('express');
var ejs = require("ejs");
var mysql =  require('../routes/mysql');
var mq_client = require('../rpc/client');

exports.signUpCustomer = function(req, res){
	
	  var email = req.param('email');
	  var password = req.param('password');
	  var firstname = req.param('firstname');
	  var lastname = req.param('lastname');
	  var mobile = req.param('mobile');
	  var ssn = req.param('ssn');
	  var address = req.param('address');
	  var city = req.param('city');
	  var state = req.param('state');
	  var zipcode = req.param('zipcode');
	  var creditnumber = req.param('creditnumber');
	  var creditcvv = req.param('creditcvv');
	  var creditmonth = req.param('creditmonth');
	  var credityear = req.param('credityear');
	  var postalcode = req.param('postalcode');
	  
	  console.log("into js" + " " + req.param('email'));
	  console.log("email "+email);
	  console.log("fn "+firstname);
	  var msg_payload={
			   "c_emailid" : email,
			   "c_password" : password,
			   "c_firstname" : firstname,
			   "c_lastname" : lastname,
			   "c_phone" : mobile,
			   "c_ssn" : ssn,
			   "c_address" : address,
			   "c_city" : city,
			   "c_state" : state,
			   "c_zipcode" : zipcode,
			   "c_creditcard" : creditnumber,
			   "c_cvv" : creditcvv,
			   "c_creditmonth" : creditmonth,
			   "c_credityear" : credityear,
			   "c_postalcode" : postalcode
	  };
	  
	  
		mq_client.make_request('signup_queue', msg_payload, function(err, results) {

			console.log(results.statusCode);
			if (err) {
				throw err;
			} else {
				if (results.statusCode == 200) {
					console.log("values Inserted");
					//req.session.data = results.data;
					//console.log("Session: " + req.session.data.c_firstname);
					/*res.render('customerHome', {result:results.data});*/
					
					res.send({
						"statusCode" : 200
					});
				} else if(results.statusCode == 401)
					{

					console.log("Error");
					res.send({
						"statusCode" : 401
					});
					
				}
				 else if(results.statusCode === 500)
				 		{

						console.log("Error");
						res.send({
							"statusCode" : 500
						});
						
					}
			}
		});
	  
};

exports.signUpDriver = function(req, res){
		res.render('driverSignUp', { title: 'Express' });
	};
	

	exports.logInCustomer = function(req, res){
		
		  var email = req.param('email');
		  var password = req.param('password');

		  console.log("into js" + " " + req.param('email'));
		  console.log("email "+email);
		  msg_payload={
				  "c_emailid":email,
				  "c_password":password
				  
		  };
		  
		  mq_client.make_request('login_queue', msg_payload, function(err, results) {

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