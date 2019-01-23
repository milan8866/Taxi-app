var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require('mongo');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs = require('fs');
var mq_client = require('../rpc/client');

/*exports.getloginpage = function(req, res){
	  res.render('login');
	};*/


/*exports.d_createaccount = function(req, res){

	var email , pwd , birthdate , fname, lname  ;
	fname = req.param("firstname");
	lname = req.param("lastname");
	email = req.param("emailid");
	pwd = req.param("password");
	//expirationdate =  req.param("year")+req.param("month");
	
	var getUser="insert into driver_signup(d_firstname,d_lastname, d_emailid, d_password, d_phone , d_city) values ('" + fname.toUpperCase() + "','" + lname.toUpperCase() + "','" +  email + "','"  +  pwd + "','"  +  req.param("phone") +  "','"  +  req.param("city") + "')"; 
	console.log("Query is:"+getUser);
	
	mysql.fetchData(function(err,results){
					if (results.insertId > 0){
					console.log("Successfully Signed up");
					 res.send({"login":"Success"});
					        }
					        else {
					        	res.send({"login":"Fail"});
					            console.log(err);
							
					        }  
				}
		,getUser);

};*/

//////////////////////////////////////////SHOW DRIVER /////////////////////////////////////////////////////////////////


exports.showdriver = function(req, res){
	console.log("show driver node");
	msg_payload={};
	mq_client.make_request('showDriver_queue', msg_payload, function(err, results) {

		console.log("show driver reply"+results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send(JSON.stringify(results.data));
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};

/////////////////////////////////////////SHOW DRIVER REVIEW RIDE////////////////////////////////////////////////////////////////
exports.driverreviewride = function(req, res){

	msg_payload={};
	mq_client.make_request('driverviewride_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].d_firstname);
				console.log("simple session "+results.data);
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};

/////////////////////////////////////////SHOW DRIVER REVIEW////////////////////////////////////////////////////////////////
exports.driverreview = function(req, res){

	msg_payload={};
	mq_client.make_request('driverview_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].d_firstname);
				console.log("simple session "+results.data);
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};
/////////////////////////////////////////SHOW DRIVER DETAILS//////////////////////////////////////////////////////////////////////////
exports.showdriverdetails = function(req, res){
	msg_payload={"d_id":req.param("d_id")};
	mq_client.make_request('showdriverdetails', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log("add driver JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("add driver Session: " + req.session.data[0].d_firstname);
				console.log("add driver simple session "+results.data);
				
				res.send(JSON.stringify(results.data));
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


exports.adddriverreq = function(req, res){
	msg_payload={};
	mq_client.make_request('addDriver_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log("add driver JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("add driver Session: " + req.session.data[0].d_firstname);
				console.log("add driver simple session "+results.data);
				
				res.send(JSON.stringify(results.data));
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});};

//////////////////////////////////////////APPROVAL/////////////////////////////////////////////////////////////////////////

exports.approvedriver = function approvedriver(req,res)
{  
	var d_id = req.param('d_id');
	msg_payload={"d_id":d_id};
	mq_client.make_request('approvedriver_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+results);
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].d_firstname);
				console.log("simple session "+results.data);
				
				res.send();
				
			} else if(results.statusCode == 401){

				console.log("Error");
	
			}
		}
	});
	
};

///////////////////////////////////////DENY////////////////////////////////////////////////////////////////////////////

exports.denydriver = function denydriver(req,res)
{  
	
	var d_id = req.param('d_id');
	msg_payload={"d_id":d_id};
	mq_client.make_request('denydriver_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Deleted "+results);
				
				res.send();
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
	
	
};



////////////////////
exports.driverProfileUpdate = function(req, res){

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
	  
	  console.log("driver.js sessio is "+req.session.driver.d_id);
	  
	  var msg_payload={
			  	"d_id":req.session.driver.d_id,
			   "d_emailid" : email,
			   "d_password" : final_password,
			   "d_firstname" : firstname,
			   "d_lastname" : lastname,
			   "d_phone" : mobile,
			   "d_address" : address,
			   "d_city" : city,
			   "d_state" : state,
			   "d_zipcode" : zipcode
	  };
	  
	  
		mq_client.make_request('driverUpdate_queue', msg_payload, function(err, results) {

			console.log(results.statusCode);
			if (err) {
				throw err;
			} else {
				if (results.statusCode == 200) {
					console.log("values Inserted");
					req.session.driver = results.data[0];
					console.log("Session: " + JSON.stringify(req.session.driver));
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


///////////////////////////////////////////ADD RATING///////////////////////////////////////////////////////////
exports.addtorating = function addtorating(req,res)
{  var rating = req.param("rating");
	var r_id = req.param("r_id");
	console.log(rating);
	var query2 = 'update driver_ratings set rating = "'+ rating +'" where ride_id = "'+r_id+'"'; 
	console.log("rating query : "+query2);
	//var query2 = "update driver_ratings set rating = "+req.param("rating")+ " where ride_id = " +req.session.rideid; 
	
	mysql.fetchData(function(err,addtorating){
		if(err){
			throw err;
		}
		else 
		{  
			console.log("Updated");
			res.end();
		}
	},query2);
    
};
/////////////////////////////////////////ADD REVIEW//////////////////////////////////////////////////////////////////
exports.postreview = function postreview(req,res)
{  var review = req.param("review");
	console.log(review);
	var query2 = "update driver_ratings set review = '"+req.param("review")+ "' where ride_id = '"+req.param("r_id")+ "'";
	//var query2 = "update driver_ratings set review = "+req.param("review")+ " where ride_id = " +req.session.rideid; 
	console.log("review query"+query2);
	mysql.fetchData(function(err,postreview){
		if(err){
			throw err;
		}
		else 
		{  
			console.log("Updated");
			res.end();
		}
	},query2);
    
};
