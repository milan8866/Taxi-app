/**
 * http://usejsdoc.org/
 */
var ejs = require('ejs');
var mysql = require('mysql');


var pool = mysql.createPool({

	host : 'localhost',

	user : 'root',

	password : 'root',

	database : 'uberapp',

	max : 10,
	
	port : 3306

	  });

function fetchData(callback,sqlQuery){
	
	//var connection=getConnection();
	
	pool.getConnection(function(err,connection){connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			
		}
		else 
		{	// return err or result
			
			callback(err, rows);
		}
	});
	
	connection.release();
});
	}

function insertData(callback,sqlQuery,set)
{
	console.log(sqlQuery);
	console.log("set.."+set);
	pool.getConnection(function(err,connection){
		connection.query(sqlQuery,set, function(err,result){
			if(err){
				console.log("set..error"+set);	
			}
			else
				{
				
				callback(err,result);
				}
		});
		
		connection.release();
	});
	
}

/*function updateData(callback,sqlQuery,set)
{
	
	pool.getConnection(function(err,connection){
		connection.query(sqlQuery,set, function(err,result){
			if(err){
				
			}
			else
				{
				
				callback(err,result);
				}
		});
		
		connection.release();
	});
	
}*/

exports.fetchData=fetchData;
exports.insertData=insertData;
/*exports.updateData=updateData;*/