/**
 * http://usejsdoc.org/
 */

var mq_client = require('../rpc/client');

exports.driverLoginNext = function(req,res)
{
	var email = req.param('email');
	var password = req.param("password");
	
	
	var msg_payload = {"email":email,"password":password,"task":"driverLogin"}
	mq_client.make_request('login_queue', msg_payload, function(err, results){
		console.log("Respose: "+JSON.stringify(results));
		//console.log("flag" + results.data[0].d_flag);
		if(err)
			{
			console.log("devi 1 : "+err);
			throw err;
			}
		else
			{
				if(results.statusCode === 200)
					{
					console.log("v login");
					console.log("valid login1"+JSON.stringify(results.data[0]));
					req.session.driver = results.data[0];
					res.send({
						"statusCode" : 200,
						"flag" : results.data[0].d_flag
					});
					}
				else if(results.statusCode === 401)
					{
					//console.log("devi 2 : "+results);
						console.log(err);
						res.send({
							"statusCode" : 401
						});
					}
			}
	});
	
}

exports.driverLogin = function(req,res)
{
	res.render('loginDriver');
}

exports.driverHome = function(req,res)
{	if(req.session.driver){
	res.render('driverHome',{data:req.session.driver});
	}
else
	{
		res.redirect('/driverLogin');
	}
}