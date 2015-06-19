'use strict';
process.env.MONGOLAB_URI = 'mongodb://localhost/turtle_test';
require('../server.js');

var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/User.js');
var ContactList = require('../models/ContactList');
var mongoose = require('mongoose');
chai.use(chaihttp);

var server_url = 'localhost:3000';
describe('message_test.js', function () {
	// create users before running tests
	var userKeys = {};

	before(function(done){
		var users_created_count = 0;
		var users = ['monica'];
		var getUserList = function(){
			chai.request(server_url)
				.get('/api/users')
				.set('eat', userKeys.monica.key)
				.end(function(err, res){
					if (err) console.log(err); 		
					for (var i=0; i<res.body.length; i++){
						userKeys[res.body[i].username]._id = res.body[i]._id;
					}	
					done();
				});
		};
		var log_inUser = function(name){
			chai.request(server_url)
				.get('/api/log_in')
				.auth(name, name)
				.end(function(err, res){
					if (err) console.log(err);
					userKeys[name] = {};
					userKeys[name].key = res.body.eat;
					users_created_count++;
					if (users_created_count === users.length){
						getUserList();
					}
				});
		};
		users.forEach(function(user){
			chai.request(server_url)
				.post('/api/users')
				.send({username: user, email: user, password: user})
				.end(function(err, res) {
					if (err) console.log(err);
					log_inUser(user);
				});
		});
	});

	describe('post a message to a chat', function(){
		var testMessage = {
			users: ["monica", "dane"],
			threadName: "splicky",
			authorName: "monica",
			text: "yo maslug whats up",
		}; 

		it('should return a message object', function(done){
			chai.request(server_url)
				.post('/api/messages/createmessage')
				.set('eat', userKeys.monica.key)
				.send(testMessage)
				.end(function(err, res){
					expect(err).to.eql(null);
					expect(res.body.threadName).to.eql('splicky');
					expect(res.body.authorName).to.eql('monica');
					expect(res.body.text).to.eql('yo maslug whats up');
					expect(res.body).to.have.property('_id');
					done();
			});
		});
	});	

	describe('fetch inbox', function(done){
	 it('should return an array of messages', function (done) {
		 chai.request('localhost:3000')
		 .get('/api/dashboard')
		 .send({eat: userKeys.monica.key})
		 .end(function (err, res) {
			 expect(err).to.eql(null);
			 expect(Array.isArray(res.body)).to.eql(true);
			 done();
		 })
	 })
	});
});
