'use strict';
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var User = require('../models/User.js');
var ContactList = require('../models/ContactList');
var mongoose = require('mongoose');
chai.use(chaihttp);

describe('create users with friends',function(){
	var users = ['monica', 'daren', 'harvey', 'cleo', 'darnet'];
	var server_url = 'localhost:3000'
	var userKeys = {};

	before(function(done){
		var users_created_count = 0;
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

	describe('create frined request between freinds', function(){
		it('should return true', function(done){
			var friendsDoneMakingRequestCount = 0;	
			users.forEach(function(userFrom){
				var freindsMadeCount = 0;
				users.forEach(function(userTo){
					chai.request(server_url)
						.post('/api/contacts/request')
						.send({eat: userKeys[userFrom].key , user_id: userKeys[userTo]._id})
						.end(function(err, res){
							if (err) console.log(err);
							freindsMadeCount++;
							if (freindsMadeCount === users.length) {
								friendsDoneMakingRequestCount++;
								if (friendsDoneMakingRequestCount === users.length){
									done();
								}
							}	
					});
				});		
			});		
		});
	});

	describe('accept all the friend requests', function(){
		it('should return true', function(done){
			var friendsDoneMakingRequestCount = 0;	
			users.forEach(function(userFrom){
				var freindsMadeCount = 0;
				users.forEach(function(userTo){
					console.log('userFrom:', userFrom, 'userTo:', userTo);
					chai.request(server_url)
						.post('/api/contacts/request/accept')
						.send({eat: userKeys[userFrom].key , user_id: userKeys[userTo]._id})
						.end(function(err, res){
							if (err) console.log(err);
							freindsMadeCount++;
							if (freindsMadeCount === users.length) {
								friendsDoneMakingRequestCount++;
								if (friendsDoneMakingRequestCount === users.length){
									done();
								}
							}	
					});
				});		
			});		
		});
	});
});
