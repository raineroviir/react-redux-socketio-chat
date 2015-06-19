'use strict';

var bcrypt   = require('bcrypt-nodejs');
var eat      = require('eat');
var mongoose = require('mongoose');

// DB Schema for User
var UserSchema = mongoose.Schema({
  eat: Number,
  role: { type: String, default: "regularUser" },
  suspended: { type: Boolean, default: false },
  username:  { type: String, required: true, unique: true },
	groups: String,
  basic: {
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true               }
  },
  threads: Array
});

// Validations
UserSchema.path('basic.email'   ).required(true);
UserSchema.path('basic.email'   ).index( {unique: true} );
UserSchema.path('basic.password').required(true);
UserSchema.path('username'      ).required(true);
UserSchema.path('username'      ).index( {unique: true} );

// User Methods
UserSchema.methods.generateHash = function generateHash(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function saveHashedPassword(err, hash) {
      if (err) throw err;
      callback(hash);
    });
  });
};

UserSchema.methods.checkPassword = function checkPassword(password, callback) {
  bcrypt.compare(password, this.basic.password, function validatePassword(err, res) {
    if (err) throw err;
    callback(res);  // if failure, res=false. if success, res=true
  });
};

UserSchema.methods.generateToken = function generateToken(secret, callback) {
  var currentDate = new Date();
  this.eat = currentDate.getTime();

  this.save(function(err, user) {
    if (err) {
      return callback(err, null);
    }

    eat.encode({eat: user.eat}, secret, function encodeEat(err, eatoken) {
      if (err) {
        console.log('Error encoding eat. Error: ', err);
        return callback(err, null);
      }
      callback(err, eatoken);
    });
  });
};

UserSchema.methods.invalidateToken = function invalidateToken(callback) {
  this.eat = null;
  this.save(function(err, user) {
    if (err) {
      console.log('Could not save invalidated token. Error: ', err);
      return callback(err, null);
    }
    callback(err, user);
  });
};

// Export mongoose model/schema
module.exports = mongoose.model('User', UserSchema);



