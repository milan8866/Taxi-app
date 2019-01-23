var ejs = require("ejs");
var mysql = require('./mysql');
var mq_client = require('../rpc/client');
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var mongo = require('../routes/mongo');
var mongoURL = 'mongodb://localhost:27017/uberapp';
var fs=require('fs');

/*exports.getloginpage = function(req, res){
	  res.render('login');
	};*/

	
/*exports.c_createaccount = function(req, res){
	var email , pwd  , fname, lname ;
	fname = req.param("firstname");
	lname = req.param("lastname");
	email = req.param("emailid");
	pwd = req.param("password");
	//expirationdate =  req.param("year")+req.param("month");
	
	var getUser="insert into customer_signup(c_firstname,c_lastname, c_emailid, c_password, c_phone , c_creditcard , c_cvv) values ('" + fname.toUpperCase() + "','" + lname.toUpperCase() + "','" +  email + "','"  +  pwd + "','"  +  req.param("phone") + "','" +  req.param("creditcard") + "','"  +  req.param("cvv") + "')"; 
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

};
*/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.addcustomerreq = function(req, res){
	
	msg_payload={};
	mq_client.make_request('addCustomer_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+JSON.stringify(results.data));
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].c_firstname);
				console.log("simple session "+results.data);
				
				res.send(JSON.stringify(results.data));
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
			}
		}
	});
	
};


/////////////////////////////////////////SHOW CUSTOMER REVIEW////////////////////////////////////////////////////////////////
exports.customerreview = function(req, res){

msg_payload={};
mq_client.make_request('customerreview_queue', msg_payload, function(err, results) {

console.log(results.statusCode);
if (err) {
throw err;
} else {
if (results.statusCode == 200) {
console.log(" JSON values Inserted "+JSON.stringify(results.data));
console.log("simple session "+results.data);
res.send(results.data);
} else if(results.statusCode == 401){

console.log("Error");


}
}
});

};

//////////////////////////////////////////SHOW CUSTOMER /////////////////////////////////////////////////////////////////


exports.showcustomer = function(req, res){
	console.log("show customer node");
	msg_payload={};
	mq_client.make_request('showCustomer_queue', msg_payload, function(err, results) {

		console.log("show customer reply"+results.statusCode);
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


//////////////////////////////////////////APPROVAL/////////////////////////////////////////////////////////////////////////

exports.approvecust = function approvecust(req,res)
{  
	var c_id = req.param('c_id');
	msg_payload={"c_id":c_id};
	mq_client.make_request('approvecustomer_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Inserted "+results);
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].d_firstname);
				console.log("simple session "+results.data);
				
				res.end();
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
				
			}
		}
	});
    
};

///////////////////////////////////////DENY////////////////////////////////////////////////////////////////////////////

exports.denycust = function denycust(req,res)
{  
	var c_id = req.param('c_id');
	msg_payload={"c_id":c_id};
	mq_client.make_request('denycustomer_queue', msg_payload, function(err, results) {

		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				console.log(" JSON values Deleted "+results);
				//req.session.data = results.data;
				//console.log("Session: " + req.session.data[0].d_firstname);
				console.log("simple session "+results.data);
				
				res.end();
				
			} else if(results.statusCode == 401){

				console.log("Error");
				
			}
		}
	});
	
};

////////////////////////////SHOW STATS/////////////////////////////////////////////////////////////


exports.showstats = function showstats(req,res)
{  var status = req.param("selected");
	console.log(status);
	
	if (status === "1"){ 
	var query2 = "select sum(amount) as Revenue,billingdate from displaybills group by billingdate having billingdate between '" + req.param("fromdate") + "' and '" + req.param("todate") + "'"; 
	mysql.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{  	console.log(results);
			 res.send({"result":JSON.stringify(results)});
		}
	},query2);
	}
	
	if (status === "2"){ 
		var query3 = "select count(*) as Revenue,billingdate from displaybills group by billingdate having billingdate between '" + req.param("fromdate") + "' and '" + req.param("todate") + "'"; 
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{  	console.log(results);
				 res.send({"result":JSON.stringify(results)});
			}
		},query3);
		}
};



////get online drivers//////


exports.getOnlineDrivers = function(req,res){
	var msg_payload = {"task":"Online drivers" , "c_lat" : req.param("c_lat") , "c_lng" : req.param("c_lng")};
	//var msg_payload = {"task":"Online drivers"};
	mq_client.make_request('getOnlineDrivers_queue',msg_payload,function(err,results){
		console.log(results.statusCode);
		if(err){
			throw err;
		}else{
			if(results.statusCode == 200){
				console.log("Values Fetched");
				res.send({
					"statusCode": 200,
					"data":results.data,
					"data1" : results.data1
				});
			}
			else if(results.statusCode == 401){
				console.log(error);
				res.send({
					"statusCode":401
				})
			}
		}
	});
};


//selected Driver

exports.requestRide = function(req,res){
	
	var d_id = req.param("id");
	
	console.log("in js d_id "+d_id);
	var msg_payload = {"task":"Selected driver","d_id":d_id};
	mq_client.make_request('getStartRide_queue',msg_payload,function(err,results){
		console.log("status code "+results.statusCode);
		if(err){
			throw err;
		}else{
			if(results.statusCode == 200){
				console.log("Values Fetched"+JSON.stringify(results.data));
				res.send({
					"statusCode": 200,
					"data":JSON.stringify(results.data)
				});
			}
			else if(results.statusCode == 401){
				console.log(error);
				res.send({
					"statusCode":401
				})
			}
		}
	});
};


exports.viewDriver = function(req,res){
	
	var d_id = req.param("id");
	
	console.log("in js d_id "+d_id);
	var msg_payload = {"task":"Selected driver","d_id":d_id};
	mq_client.make_request('getSelectedDriver_queue',msg_payload,function(err,results){
		console.log("status code "+results.statusCode);
		if(err){
			throw err;
		}else{
			if(results.statusCode == 200){
				console.log("Values Fetched"+JSON.stringify(results.data));
				res.send({
					"statusCode": 200,
					"data":JSON.stringify(results.data)
				});
			}
			else if(results.statusCode == 401){
				console.log(error);
				res.send({
					"statusCode":401
				})
			}
		}
	});
};

exports.getImage = function(req,res){
	
	//var d_id = req.param("id");

	
	var d_id = (req.param("id"));
	console.log("driver id get image "+d_id);
	var conn = mongoose.createConnection('localhost', 'uberapp', 27017 );
	Grid.mongo =mongoose.mongo;
	var gfs=Grid(conn.db);
	conn.once('open',function(){
		//var fs_write_stream = fs.createWriteStream(res);
		 
		//read from mongodb
		var readstream = gfs.createReadStream({
			filename: d_id
		});
		readstream.pipe(res);
		readstream.on('close', function () {
		     console.log('file has been written fully!');
		});
	});
		
};


///////////////////////////////////////////GET TRIPS//////////////////////////////////////////////////////////////

exports.getTrips = function getTrips(req,res)
{  
	var c_id = req.session.data.c_id;
	console.log("trips session cid"+c_id);
	msg_payload={"c_id":c_id};
	mq_client.make_request('customertrips_queue', msg_payload, function(err, results) {
		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				//res.data =JSON.stringify(results.data);
				console.log(" JSON values Inserted "+ JSON.stringify(results.data));
				res.send({"data" : results.data});
				
			} else if(results.statusCode == 401){

				console.log("Error");
			}
		}
	});  
};

///////////////////////////////////////////GET Driver TRIPS//////////////////////////////////////////////////////////////

exports.getDriverTrips = function getDriverTrips(req,res)
{  
	var d_id = req.session.driver.d_id;
	console.log("trips session cid"+d_id);
	msg_payload={"d_id":d_id};
	mq_client.make_request('drivertrips_queue', msg_payload, function(err, results) {
		console.log(results.statusCode);
		if (err) {
			throw err;
		} else {
			if (results.statusCode == 200) {
				//res.data =JSON.stringify(results.data);
				console.log(" JSON values Inserted "+ JSON.stringify(results.data));
				res.send({"data" : results.data});
				
			} else if(results.statusCode == 401){

				console.log("Error");
			}
		}
	});  
};

///////////////////////////////////////////ADD RATING///////////////////////////////////////////////////////////
exports.addtoratingCustomer = function addtorating(req,res)
{  var rating = req.param("rating");
	var r_id = req.param("r_id");
	console.log(rating);
	var query2 = 'update customer_ratings set rating = "'+ rating +'" where ride_id = "'+r_id+'"'; 
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
exports.postreviewCustomer = function postreview(req,res)
{  var review = req.param("review");
	console.log(review);
	var query2 = "update customer_ratings set review = '"+req.param("review")+ "' where ride_id = '"+req.param("r_id")+ "'";
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
////////////////////////////////////////////GRPAHSS////////////////////////////////////////////////////

exports.showgraphs = function(req,res){
 console.log("show graphsss");
	var msg_payload = {"task":"Selected driver"};
	mq_client.make_request('getgraphs_queue',msg_payload,function(err,results){
		console.log("status code "+results.statusCode);
		if(err){
			throw err;
		}else{
			if(results.statusCode == 200){
				console.log("Values Fetched"+JSON.stringify(results.data));
				res.send({
					"statusCode": 200,
					"data":JSON.stringify(results.data)
				});
			}
			else if(results.statusCode == 401){
				console.log(error);
				res.send({
					"statusCode":401
				})
			}
		}
	});
};
/////////////////////////////////////////RIDES PER DRIVER///////////////////////////////////////////////////////////////////
exports.DriverRides = function DriverRides(req,res)
{  var fname = req.param("driver_fname");
	var lname = req.param("driver_lname");
	console.log("Fname" + req.param("driver_fname"));
	console.log("lname" + req.param("driver_lname"));
	mongo.connect(mongoURL,function(){
		console.log("conected at"+mongoURL);
		var coll = mongo.collection('ride_demo');
		coll.find({d_fname : fname, d_lname : lname}).toArray(function(err, user){
				if(user){
				console.log("ride_demo driverrrrr ride" + JSON.stringify(user) + user);
				 res.send({"result_driver":JSON.stringify(user)});
				}
		else
		{	res.send({"statuscode" : 400});
			console.log("Error it wasssss!!");
		}
	});
});

};

/////////////////////////////////////////CUSTOMER PER DRIVER///////////////////////////////////////////////////////////////////
exports.CustomerRides = function CustomerRides(req,res)
{  var fname = req.param("customer_fname");
	var lname = req.param("customer_lname");
	console.log("Fname" + req.param("customer_fname"));
	console.log("lname" + req.param("customer_lname"));
	mongo.connect(mongoURL,function(){
		console.log("conected at"+mongoURL);
		var coll = mongo.collection('ride_demo');
		coll.find({c_fname : fname, c_lname : lname}).toArray(function(err, user){
				if(user){
				console.log("ride_demo customer ride" + JSON.stringify(user) + user);
				 res.send({"result_customer":JSON.stringify(user)});
				}
		else
		{	res.send({"statuscode" : 400});
			console.log("Error it wasssss!!");
		}
	});
});

};
///////////////////////////////AREA WISE RIDESSS////////////////////////////////////////////////
exports.AreaRides = function AreaRides(req,res)
{  var area = req.param("area");
	
	console.log("area" + req.param("area"));

	mongo.connect(mongoURL,function(){
		console.log("conected at"+mongoURL);
		var coll = mongo.collection('ride_demo');
		coll.find({origin_city : area}).toArray(function(err, user){
				if(user){
				console.log("ride_demo customer ride" + JSON.stringify(user) + user);
				 res.send({"result_customer":JSON.stringify(user)});
				}
		else
		{	res.send({"statuscode" : 400});
			console.log("Error it wasssss!!");
		}
	});
});

};