var mq_client = require('../rpc/client');
mongoURL = 'mongodb://localhost:27017/uberapp';

exports.goonline = function(req,res)
{
	var msg_payload = {"email":req.param('demail')};
	mq_client.make_request("driver_goonline_queue",msg_payload,function(err,results){
	console.log("Response of goonline: " + JSON.stringify(results));
	if(err)
		{
		res.send({"statusCode":401});
		}
	else
		{
		res.send({"statusCode":200});
		}
	});
	};

exports.gooffline = function(req,res)
{
	var msg_payload = {"email":req.param('demail')};
	mq_client.make_request("driver_gooffline_queue",msg_payload,function(err,results){
		console.log("response of gooffline: "+JSON.stringify(results));
		if(err)
		{
		res.send({"statusCode":401});
		}
	else
		{
		res.send({"statusCode":200});
		}
	});
};

exports.fetchRequest = function(id,cid,callback){
	var msg_payload = {"id":id,"cid":cid};
	console.log("In the fetchRequest");
	
	mq_client.make_request("fetch_request_queue",msg_payload,function(err,results){
		console.log("response: " + JSON.stringify(results));
		if(err)
			{
			throw err;
			callback(false);
			}
		if(results)
			{
			callback(results);
			}
	});
};

exports.startRide = function(req,res){
	console.log("startRide");
	var msg_payload = {demail:req.param('demail'),did:req.param('did'),cid:req.param('cid')};
	
	mq_client.make_request("start_ride",msg_payload,function(err,results){
		console.log("response: "+ JSON.stringify(results));
		if(err)
			{
			throw err;
			console.log("Error");
			}
		else
			{
			if(results.statusCode === 200)
				{
				res.send({"statusCode":200});
				}
			else if(results.statusCode === 401)
				{
				res.send({"statusCode": 401});
				}
			}
	});
};

exports.endRideFunction = function(req,res){
	var msg_payload = {demail:req.param("demail"),did:req.param("did"),cid:req.param("cid")};
	
	mq_client.make_request("end_ride_queue",msg_payload,function(err,results){
		console.log("response from end ride: "+ JSON.stringify(results));
		if(err)
			{
			throw err;
			console.log("Error");
			}
		else
			{
			if(results.statusCode === 200)
				{
				res.send({"statusCode":200,"rideid":results.rideid});
				}
			else if(results.statusCode === 401)
				{
				res.send({"statusCode": 401});
				}
			}

	});
	

	};
	
exports.billingDriver = function(req,res)
{
	var msg_payload = {demail:req.param("demail"),did:req.param("did"),cid:req.param("cid"),rideid:req.param('rideid')};
	console.log("Billing driver");
	
	mq_client.make_request("generate_bill_queue_driver",msg_payload,function(err,results){
		console.log("Response from billing queue: " + JSON.stringify(results));
		if(err)
			{
			throw err;
			console.log("Error");
			}
		else
			{
			if(results.statusCode === 200)
				{
				req.session.billdata = results.data;
				res.send({'statusCode':200,"rideid":results.data.r_id});
				}
			else if(results.statusCode === 401)
				{
				res.send({'statusCode':401});
				}
			}
	});
	}

exports.showBill = function(req,res)
{
	if(req.session.billdata && req.session.driver)
		{
		console.log(JSON.stringify(req.session.billdata));
		res.render('billingCounter',{billdata:req.session.billdata,data:req.session.driver});
		}
	else
		{
		res.redirect('/logInDriver');
		}
	}
