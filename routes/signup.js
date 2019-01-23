/**
 * http://usejsdoc.org/
 */

var mq_client = require('../rpc/client');

exports.customerSignup = function(req, res){
	
	res.render('customerSignUp', { title: 'Express' });
};

exports.driverSignup = function(req, res){

	res.render('driverSignUp', { title: 'Express' });

};

exports.driverSignupNext = function(req,res){
	
	var dfirst_name = req.param('dfirst_name')
	,	dlast_name = req.param('dlast_name')
	,	demail = req.param('demail')
	,	dcontactinfo = req.param('dcontactinfo')
	,	dpassword = req.param('dpassword')
	,	dcity_name = req.param('dcity_name')
	, dstate_name = req.param('dstate_name')
	, daddress = req.param('daddress')
	, dpostalcode = req.param('dpostalcode');

	var json_response = {};

	var msg_payload = {
		"dfirst_name" : dfirst_name,
		"dlast_name" : dlast_name,
		"demail" : demail,
		"dcontactinfo" : dcontactinfo,
		"dpassword" : dpassword,
		"dcity_name" : dcity_name,
		"dstate_name" : dstate_name,
		"daddress" : daddress,
		"dpostalcode" : dpostalcode,
		"task" : "driversignup"
	};

mq_client.make_request('signup_queue', msg_payload, function(err, results){
	console.log("Respose: "+JSON.stringify(results));
	if(err)
		{
		throw err;
		}
	else
		{
			if(results.statusCode === 200)
				{
				console.log("valid insert");
				res.send({
					"statusCode" : 200
				});
				}
			else if(results.statusCode === 401)
				{
					console.log(error);
					res.send({
						"statusCode" : 401
					});
				}
			else if(results.statusCode === 500)
				{
				console.log("email id already exists");
				res.send({
					"statusCode" : 500 
					});
				}
		}
});
};


exports.nextStep = function(req,res){
	if(req.session.driver){
	res.render('driverHomeVehicle',{data:req.session.driver});
	}
	else
		{
			res.redirect('/log-in');
		}
};


	exports.backgoundCheck = function(req,res){
		
		if(req.session.driver){
		res.render('driverHomeBackground',{data:req.session.driver});}
		else{res.redirect('/log-in');}
	}


	exports.documents = function(req,res){
		if(req.session.driver){
	res.render('driverHomeDocument',{data:req.session.driver});}
		else{res.redirect('/log-in');}
	}


	exports.welcome = function(req,res){
		if(req.session.driver){
	res.render('driverHomeWelcomeVideo',{data:req.session.driver});}
		else{res.redirect('/log-in');}
	}


	exports.vehicleUpdated = function(req,res){
		
		var d_id = req.param('d_id');
		var cartype = req.param('d_cartype');
		var carnumber = req.param('d_carnumber');
		
		console.log("d_id : "+d_id+" cartype : "+cartype+" carnumber : "+carnumber);
		
		console.log("Making RPC call");
		var msg_payload={
						"task" : "addCarDetails",
						"d_id" : d_id,
						"d_cartype" : cartype,
						"d_carnumber" : carnumber
					};
		mq_client.make_request('signup_queue', msg_payload, function(err, results){
			
			console.log("Respose: "+JSON.stringify(results));
			if(err)
				{
				console.log("error");
				throw err;
				
				}
			else
				{
					if(results.statusCode === 200)
						{
						console.log("valid insert");
						res.send({
							"statusCode" : 200
						});
						}
					else if(results.statusCode === 401)
						{
							console.log(error);
							res.send({
								"statusCode" : 401
							});
						}
				}
		});
	}
	
	//addSSN
	exports.addSSN=function(req,res){
		var d_video=req.param('d_video');
		var d_ssn=req.param('d_ssn');
		var d_id = req.session.driver.d_id;
		console.log("in addSSN , d_ssn : "+d_ssn+" d_id "+d_id);
		var msg_payload={
				"task" : "addSSN",
			"d_ssn":d_ssn,
			"d_video":d_video,
			"d_id":d_id
		}
mq_client.make_request('signup_queue', msg_payload, function(err, results){
			
			console.log("Respose: "+JSON.stringify(results));
			if(err)
				{
				console.log("error");
				throw err;
				
				}
			else
				{
					if(results.statusCode === 200)
						{
						console.log("valid update");
						res.send({
							"statusCode" : 200
						});
						}
					else if(results.statusCode === 401)
						{
							console.log(error);
							res.send({
								"statusCode" : 401
							});
						}
				}
		});
	};