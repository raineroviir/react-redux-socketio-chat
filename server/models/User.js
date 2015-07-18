var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  email: String,
  password: String,
  username: String
});

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

module.exports = mongoose.model('User', UserSchema);
