var amqp = require('amqp');

var connection = amqp.createConnection({host:'127.0.0.1'});
var rpc = new (require('./amqprpc'))(connection);


function make_request(queue_name, msg_payload, callback){
	console.log("in make request before");
	rpc.makeRequest(queue_name, msg_payload, function(err, response){
		console.log("in make request");
		if(err){
			console.log(":err client rpc"+response);
			console.error(err);
			//res={};
			//res.statusCode=401;
			//callback(null,res);
		}
		else{
			console.log("response1234: " + JSON.stringify(response));
			callback(null, response);
		}
		//connection.end();
	});
}

exports.make_request = make_request;
