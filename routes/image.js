var ejs = require("ejs");//image
var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
var fs=require('fs');
var mongo=require("../routes/mongo");
mongoURL = 'mongodb://localhost:27017/rideImage'
	
exports.uploadLicense =function(req,res){
	console.log(req.files);
	var d_id =(req.session.driver.d_id).toString();
	console.log("inupload : "+d_id);
	var img= req.files.img_1.path
	var img1= req.files.img_1;
	console.log("image path"+img);
	console.log("image "+JSON.stringify(img1));
	
	if((d_id).length==1)
	{
		console.log("in if");
	

	var conn = mongoose.createConnection('localhost', 'driverLicense', 27017 );
	Grid.mongo =mongoose.mongo;
		conn.once('open',function(){
		console.log('open connection');
		var gfs=Grid(conn.db);
		
		var wrt = gfs.createWriteStream({
			
			filename:d_id
		});
		fs.createReadStream(img).pipe(wrt);
		
		wrt.on('close',function(file){
			conn.once('open',function(){
				
				readstream.on('close', function () {
				     console.log('file has been written fully!');
				
				});
		});
			console.log(file.filename + 'Wrte');
			res.render("driverHomeWelcomeVideo");
		});
	});
	}
	else{
		console.log("in else");
		var conn = mongoose.createConnection('localhost', 'driverLicense', 27017 );
	Grid.mongo =mongoose.mongo;
	
	//var imgname="abc"+i;
	conn.once('open',function(){
		console.log('open connection');
		var gfs=Grid(conn.db);
		
		var wrt = gfs.createWriteStream({
		//s	img_id:"12",
			filename:d_id
		});
		fs.createReadStream(img).pipe(wrt);
		
		wrt.on('close',function(file){
			conn.once('open',function(){
				//var fs_write_stream = fs.createWriteStream(res);
				 
				/*//read from mongodb
				var readstream = gfs.createReadStream({
				     filename: d_id
				});*/
				readstream.pipe(res);
				readstream.on('close', function () {
				     console.log('file has been written fully!');
				
				});
		});
			console.log(file.filename + 'Wrte');
			res.render("driverHomeWelcomeVideo");
		});
	});
	}
	
	//var d_id =(req.session.d_id).toString;

}

//readLicense
exports.readLicense=function(req,res){
	var d_id = (req.param("id")).toString();
	console.log("driver id get image "+d_id);
	var conn = mongoose.createConnection('localhost', 'driverLicense', 27017 );
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

//read multiple ride iage
exports.uploadRideImage =function(req,res){
	console.log(req.files);
	//var d_id= 5;
//	var c_id =(req.session.data.c_id).toString();
	var c_id = 5;
	console.log("inupload : "+c_id);
	var img= req.files.img_1.path
	var img1= req.files.img_1;
	console.log("image path"+img);
	console.log("image "+JSON.stringify(img1));
	var rand=Math.floor((Math.random() * 100) + 1);
	var c_id1=rand.toString()+c_id;
	mongo.connect(mongoURL, function() {
		console.log("connected to mongo at " + mongoURL);
		var coll = mongo.collection('rideImage');
		coll.insert({"c_id":c_id,"rand_id" : c_id1}
		, function(err, doc) {
			if (err) {
				throw err;
			} else {	

	var conn = mongoose.createConnection('localhost', 'rideImage', 27017 );
	Grid.mongo =mongoose.mongo;
	
	//var imgname="abc"+i;
	conn.once('open',function(){
		console.log('open connection');
		var gfs=Grid(conn.db);
		
		var wrt = gfs.createWriteStream({
			
			filename:c_id1
		});

					fs.createReadStream(img).pipe(wrt);
					wrt.on('close',function(file){
						conn.once('open',function(){
							//var fs_write_stream = fs.createWriteStream(res);
							 
							//read from mongodb
							//var readstream = gfs.createReadStream({
							  //   filename: d_id
							//});
							//readstream.pipe(res);
							readstream.on('close', function () {
							     console.log('file has been written fully!');
							
							});
					});
						console.log(file.filename + 'Wrte');
						res.send();
					});
				//}
			//})
		//});



	});
	
			}})});
	//var d_id =(req.session.d_id).toString;

}
