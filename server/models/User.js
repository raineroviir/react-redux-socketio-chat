var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  local: {
    username: String,
    password: String,
    email: String,
  },
  facebook: {
    id: String,
    username: String,
    token: String,
    email: String,
  },
  online: Boolean
});

// UserSchema.methods.generateHash = function generateHash(password, callback) {
//   bcrypt.genSalt(8, function(err, salt) {
//     bcrypt.hash(password, salt, null, function saveHashedPassword(err, hash) {
//       if (err) throw err;
//       callback(hash);
//     });
//   });
// };
//
// UserSchema.methods.checkPassword = function(password, cb) {
// 	bcrypt.compare(password, this.password, function(err, response) {
// 		if (err) {
// 			return cb(err);
// 		}
// 		cb(null, response);
// 	});
// };
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
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
