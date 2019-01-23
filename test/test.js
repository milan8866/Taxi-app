/**
 * New node file
 */
/**
 * http://usejsdoc.org/
 */

var request = require('supertest')
, should = require('should')
, express = require('express')
,assert = require("assert")
,http = require("http");


var app = express();
app.use(express.cookieParser());



describe('cookie tests', function(){
	var app = express();

	app.use(express.cookieParser());

	app.get('/', function(req, res){
		res.cookie('cookie', 'sessionUBER');
		res.send();
	});

	app.get('/return', function(req, res){
		if (req.cookies.cookie) res.send(req.cookies.cookie);
		else res.send('No Luck');
	});

	var agent = request.agent(app);

	it('should save cookies', function(done){
		agent
		.get('/')
		.expect('set-cookie', 'cookie=sessionUBER; Path=/', done);
	})

	it('should send cookies', function(done){
		agent
		.get('/return')
		.expect('sessionUBER', done);
	})
})

describe('http', function(){

	it('should return the home page if the url is correct', function(done){
		http.get('http://localhost:4000/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the home page if the url is wrong', function(done){
		http.get('http://localhost:4000/simulate', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should return list of drivers if url is correct', function(done){
		http.get('http://localhost:4000/driverreview', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
	
	it('should return list of online drivers if url is correct', function(done){
		http.get('http://localhost:4000/getOnlineDrivers', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});
});