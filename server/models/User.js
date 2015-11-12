var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');
var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  local: {
    username: { type: String, unique: true },
    password: String,
    email: String,
  },
  facebook: {
    id: String,
    username: String,
    token: String,
    email: String,
  }
});

// stashed async methods
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

module.exports = mongoose.model('User', UserSchema);
