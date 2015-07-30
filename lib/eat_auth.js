'use strict';

var eat  = require('eat');
var User = require('../server/models/User.js');

module.exports = function(secret) {

  // Format for middleware; insert secret
  return function eatAuth(req, res, next) {
    var eatoken     = req.headers.eat || req.body.eat || req.params.eat;
    if (!eatoken) { // token provided?
      console.log('No eat provided.');
      return res.status(401).json({msg: 'please sign in to do that'});
    }

    eat.decode(eatoken, secret, function(err, decoded) {  // token exists - try to decode
      if (err) {
        console.log('EAT was not valid format. Error: ', err);
        return res.status(401).json({msg: 'please sign in to do that'});
      }

      User.findOne(decoded, function(err, user) {  // token decoded - find user
        if (err || !user) {
          console.log('No user matches EAT. Error: ', err);
          return res.status(401).json({msg: 'please sign in to do that'});
        }

        req.user = user;  // user exists - attach for server use
        next();           // next middleware
      });
    });
  };
};

// 'use strict';

// var eat = require('eat');
// var User = require('../models/User');

// module.exports = function(secret) {
//   return function(req, res, next) {
//     var token = req.headers.eat || req.body.eat; //|| req.params.token;
//     if (req.query.eat) {
//       token = decodeURIComponent(token);
//     }
//     var expired = Date.now() - 6048000000; //6048000000 is 10 weeks
//     if (!token) {
//       console.log('unauthorized no token in request');
//       return res.status(401).json({msg: 'not authorized, no token'});
//     }

//     eat.decode(token, secret, function(err, decoded) {
//       if (err) {
//         console.log(err);
//         return res.status(500).json({msg: 'server error'});
//       }

//       if(decoded.timestamp < expired) {
//         return res.status(401).json({msg: 'expired token'});
//       }

//       User.findOne({uniqueHash: decoded.id}, function(err, user) {
//         if (err) {
//           console.log(err);
//           return res.status(500).json({msg: 'server error'});
//         }

//         if (!user) {
//           console.log('no user found for that token');
//           return res.status(401).json({msg: 'not authorized, no user found for token'});
//         }

//         req.user = user;
//         next();
//       });
//     });
//   };
// };
