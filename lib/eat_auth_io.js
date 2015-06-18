'use strict';

var eat = require('eat');
var User = require('../models/User.js');

module.exports = function(socket, callback) {
	var secret = process.env.AUTH_SECRET;
	var cookie = {};
	socket.handshake.headers.cookie.toString().split(' ').forEach(function(param) {
		cookie[param.split('=')[0]] = param.split('=')[1];
	});
	console.log(cookie);
	var eatToken = cookie.eat;

	if (!eatToken) {
		console.log('no eat provided');
		return callback(new Error('no eat provided'));
	}

	eat.decode(eatToken, secret, function(err, decoded){
		if (err) {
			console.log('eat was not valid format. Err: ' ,err);
			return callback(err);
		}

		User.findOne(decoded, function(err, user) {
			if (err) {
				console.log(err);
				return callback(err);
			}
			if (!user) {
				console.log('no user was found');
				return callback(new Error('no user was found'));
			}
			return callback(null, user);
		});
	});	
}
