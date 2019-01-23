var ejs = require("ejs");
var mysql = require('./mysql');
var mongo = require('../routes/mongo');
var mongoURL = 'mongodb://localhost:27017/uberapp';

var mq_client = require('../rpc/client');
////////////////////////////////////////SEARCH CRITERIA FOR DATE//////////////////////////////////////////////////
/*exports.searchdate = function(req, res){
	
	var date1=req.param("date1");
	var date2=req.param("date2");
	
	var json_response;
	console.log(date1 +" is the object");
	console.log(date2 +" is the object");

		//coll.find({ "billingdate" : { "$gte" : { "$date" : "2013-10-01T00:00:00.000Z"}}})
		//coll.find((db.billing.aggregate({$project:{date:{year:{$year:2015},month:{$month:"$billingdate"},date:{$dayOfMonth:"$billingdate"}}}})):date1),function(err,user)
			
			mongo.connect(mongoURL,function(){
				console.log("connected at: "+mongoURL);
				var coll = mongo.collection('billings');
				
				coll.find({billingdate:date1,billingdate:date2},function(err,user)
						{
							if(user)
								{
									req.session.username = user.username;
									console.log(req.session.username+" is the session");
									json_response = {"statusCode":200};
									res.send(json_response);
								}
							else
								{
								console.log("returned false");
								json_responses = {"statusCode" : 401};
								res.send(json_responses);
								}
						})
			});
};
*/

/*/////////delete bill///////

exports.delsearch=function(req,res)
{
	mongo.connect(mongoURL,function(){
		console.log("conected at"+mongoURL);
		var coll = mongo.collection('billings');
		
		coll.remove({b_id: parseInt(req.param("b_id"))},function(err, user){
			if(user){
				res.statusCode = 200;
				//res.data = user;
				//console.log("User"+JSON.stringify(user));
				res.send();
				
			//	callback(null,res);		
			}
			else
				{
					res.statusCode = 401;
					//callback(null,res);
				}
		})
	});
	
	};
*/

/////////////////////////////////SEARCH CRITERIA FOR MONTH//////////////////////////////////////////////
/*exports.searchmonth = function(req, res){
	
	var month = req.param("month");	
	//var password = req.param("password");
	var json_response;
	console.log(month +" is the object");
	mongo.connect(mongoURL,function(){
		console.log("connected at: "+mongoURL);
		var coll = mongo.collection('billings');
		
		coll.find({b_month:parseInt(month)}).toArray(function(err,user)
				{
					if(user)
						{
							req.session.username = user.username;
							console.log(req.session.username+" is the session");
							json_response = {"statusCode":200};
							res.send(user);
						}
					else
						{
						console.log("returned false");
						json_responses = {"statusCode" : 401};
						res.send(json_responses);
						}
				})
	});
};
*/

/*//SEARCH FOR YEAR
exports.searchyear = function(req, res){
	
	var year=req.param("years");
	var json_response;
	console.log(year +" is the object");
	mongo.connect(mongoURL,function(){
		console.log("connected at: "+mongoURL);
		var coll = mongo.collection('billings');
		
		coll.find({"b_year":parseInt(year)}).toArray(function(err,user)
				{
					if(user)
						{
							//req.session.username = user.username;
						//	console.log(req.session.username+" is the session");
							json_response = {"statusCode":200};
							res.send(user);
						}
					else
						{
						console.log("returned false");
						json_responses = {"statusCode" : 401};
						res.send(json_responses);
						}
				})
	});
};
*/

/*//////search by billid
exports.searchbillid = function(req, res){
	
	var billid=req.param('billid');
	var json_response;
console.log(billid +" is the object");
	mongo.connect(mongoURL,function(){
		console.log("connected at: "+mongoURL);
		var coll = mongo.collection('billings');
		
		coll.find({"b_id":parseInt(billid)}).toArray(function(err,user)
				{
					if(user)
						{
							//req.session.username = user.username;
							console.log(user+" is the session");
							json_response = {"statusCode":200};
							res.send(user);
						}
					else
						{
						
						console.log("returned false billid"+user);
						json_responses = {"statusCode" : 401};
						res.send(json_responses);
						}
				})
	});
};
	
*/	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

exports.showbills = function(req, res){
	console.log("show bills node");
	msg_payload={};
	mq_client.make_request('showBills', msg_payload, function(err, results) {

		console.log("show bills reply"+results.statusCode);
		if (err) {
			console.log("resultss show bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss show bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+JSON.stringify(results.data));
		//		req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};

/////////////////////month//////////////////////////////////////////////////////////////////////////////////////////////

exports.searchmonth = function(req, res){
	console.log("show bills node");
	msg_payload={month:req.param("month")};
	mq_client.make_request('showMonth', msg_payload, function(err, results) {

		console.log("show bills month reply"+results.statusCode);
		if (err) {
			console.log("resultss showmonth bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss showmonth bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON values month Inserted "+JSON.stringify(results.data));
	//			req.session.data = zresults.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};

/////////////////////year//////////////////////////////////////////////////////////////////////////////////////////////

exports.searchyear = function(req, res){
	console.log("show bills year node");
	msg_payload={year:req.param("years")};
	mq_client.make_request('showYear', msg_payload, function(err, results) {

		console.log("show bills year reply"+results.statusCode);
		if (err) {
			console.log("resultss year bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss year bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON values year Inserted "+JSON.stringify(results.data));
	//			req.session.data = zresults.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};


/////////////////////billid//////////////////////////////////////////////////////////////////////////////////////////////

exports.searchbillid = function(req, res){
	console.log("show bills year node");
	msg_payload={b_id:req.param("billid")};
	mq_client.make_request('showBillid', msg_payload, function(err, results) {

		console.log("show bills id reply"+results.statusCode);
		if (err) {
			console.log("resultss idid bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss id bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON values id Inserted "+JSON.stringify(results.data));
	//			req.session.data = zresults.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send(results.data);
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};
/////////////////////delsreach//////////////////////////////////////////////////////////////////////////////////////////////

exports.delsearch = function(req, res){
	console.log("show bills year node");
	msg_payload={b_id:req.param("b_id")};
	mq_client.make_request('delSearch', msg_payload, function(err, results) {

		console.log("show bills year reply"+results.statusCode);
		if (err) {
			console.log("resultss year bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss year bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON values month Inserted "+JSON.stringify(results.data));
	//			req.session.data = zresults.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+JSON.stringify(results.data));
				
				res.send();
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};

/////////////////////ddetailed bill//////////////////////////////////////////////////////////////////////////////////////////////

exports.detailedBill = function(req, res){
	console.log("show detailed bills node");
	msg_payload={b_id:req.param("b_id")};
	mq_client.make_request('detailedBill', msg_payload, function(err, results) {

		console.log("show detailed bills reply"+results.statusCode+"data"+results.data);
		if (err) {
			console.log("resultss detailed bills"+JSON.stringify(results));
			throw err;
		} else {
			console.log("resultss detailed bills"+JSON.stringify(results));
			if (results.statusCode == 200) {
				console.log(" JSON detailed bills Inserted "+JSON.stringify(results.data));
				//req.session.data = zresults.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple detailed bills session "+JSON.stringify(results.data));
				
				res.send({"data":results.data[0]});
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
	
};