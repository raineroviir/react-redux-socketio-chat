'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../server/models/User.js');

// Load strategy into passport
module.exports = function passportStrategy(passport) {
  passport.use('basic', new BasicStrategy({}, function(email, password, done) { // Auth email/pass sent in header
    User.findOne({'email': email}, function(err, user) {
      if (err) return done('database error');
      if (!user) return done('user not found');
      user.checkPassword(password, function(err, result) {
        if (err) console.log(err);
        if (!result) return done('wrong password');

        return done(null, user);  // return user if no auth errors
      });
    });
  }));
};

// 'use strict';

// var Basic = require('passport-http').BasicStrategy;
// var User = require('../models/User');

// module.exports = function(passport) {
//   passport.use('basic', new Basic({}, function(username, password, done) {
//     User.findOne({'username': username}, function(err, user) {
//       if (err) {
//         return done('database error');
//       }

//       if (!user) {
//           return done('user does not exist');
//       }

//       if (!user.checkPassword(password, function(err, res) {
//         if (err) {
//           console.log(err);
//         }
//         if (!res) {
//           return done('wrong password');
//         }
//       }));
//       return done(null, user);
//     });
//   }));
// };
