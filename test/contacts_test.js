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
describe('contact_routes.js', function () {
	// create users before running tests
	var userKeys = {};

	before(function(done){
		var users_created_count = 0;
		var users = ['monica', 'daren', 'harvey', 'cleo', 'darnet'];
		var getUserList = function(){
			chai.request(server_url)
				.get('/api/users')
				.set('eat', userKeys.daren.key)
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

	// delete all the test users when your done
	after(function(done){
		User.remove({}, function(err, data){
			if (err) console.log(err);
			ContactList.remove({}, function(err, data){
				if (err) console.log(err);
				done();
			});
		});
	});

	// test friend requset
	describe('create friend request with valid input', function(){
		it('should return success true', function(done){
			chai.request(server_url)
				.post('/api/contacts/request')
				.send({eat: userKeys.cleo.key, user_id: userKeys.daren._id})
				.end(function(err, res){
					if (err) console.log(err);
					expect(res.status).to.eql(200);
					expect(res.body.success).to.eql(true);
					done();
				});
		});
	});

	describe('create friend request with invalid user_id', function(){
		it('should return success false', function(done){
			chai.request(server_url)
				.post('/api/contacts/request')
				.send({eat: userKeys.cleo.key, user_id: 'wat'})
				.end(function(err, res){
					if (err) console.log(err);
					expect(res.body.success).to.eql(false);
					done();
				});
		});
	});

	describe('create friend request with invalid eat token', function(){
		it('should return msg : please sign in to do that', function(done){
			chai.request(server_url)
				.post('/api/contacts/request')
				.send({eat: 'yoloslugwatup?nmu', user_id: userKeys.daren._id})
				.end(function(err, res){
					if (err) console.log(err);
					expect(res.body.msg).to.eql('please sign in to do that');
					done();
				});
		});
	});

	describe('fetch darens conact list and make sure cleo is has requested', function(){
		it('should return a list with daren as a friend', function(done){
			chai.request(server_url)
				.get('/api/contacts/')
				.set({eat: userKeys.daren.key})
				.end(function(err, res){
					if (err) console.log(err);
					expect(!!res.body[0].receivedRequests[userKeys.cleo._id]).to.be.eql(true);
					done();
				});
		});
	});
	
	// tset frined request accept
	describe('daren will try to accpet cleos frined request', function(){
		it('should return success true', function(done){
			chai.request(server_url)
				.post('/api/contacts/request/accept')
				.send({eat: userKeys.daren.key,user_id:userKeys.cleo._id})
				.end(function(err, res){
					if (err) console.log(err);
					expect(res.body.success).to.be.eql(true);
					done();
				});
		});
	});
	
	describe('daren will try to accpet a friend that does not exist', function(){
		it('should return success false', function(done){
			chai.request(server_url)
				.post('/api/contacts/request/accept')
				.send({eat: userKeys.daren.key,user_id:'wat lulz slug'})
				.end(function(err, res){
					if (err) console.log(err);
					expect(res.body.success).to.be.eql(false);
					done();
				});
		});
	});
	
	// test friend request deny
	describe('daren will deny a friend requset so someone daren does not know', function(){
		// make a new friend req to deny
		before(function(done){
			chai.request(server_url)
				.post('/api/contacts/request')
				.send({eat: userKeys.monica.key, user_id: userKeys.daren._id})
				.end(function(err, res){
					if (err) console.log(err);
					done();
				});
		});

		it('should return success true', function(done){
			chai.request(server_url)
				.del('/api/contacts/request/deny')
				.send({eat: userKeys.daren.key, user_id: userKeys.monica._id})
				.end(function(err, res){
					if (err) console.log(err);	
					expect(res.body.success).to.eql(true);
					done();
				});
		});
	});

});
