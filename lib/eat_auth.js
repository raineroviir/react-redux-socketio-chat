'use strict';

var eat  = require('eat');
var User = require('../models/User.js');

module.exports = function(secret) {

  // Format for middleware; insert secret
  return function eatAuth(req, res, next) {
    var eatoken     = req.headers.eat || req.body.eat || req.params.eat;
    if (!eatoken) { // token provided?
      console.log('No eat provided.');
      // TODO: WHAT DOES IOS WANT US TO RETURN HERE FOR FAILURE? FALSE?
      return res.status(401).json({msg: 'please sign in to do that'});
    }

    eat.decode(eatoken, secret, function(err, decoded) {  // token exists - try to decode
      if (err) {
        console.log('EAT was not valid format. Error: ', err);
        // TODO: WHAT DOES IOS WANT US TO RETURN HERE FOR FAILURE? FALSE?
        return res.status(401).json({msg: 'please sign in to do that'});
      }

      User.findOne(decoded, function(err, user) {  // token decoded - find user
        if (err || !user) {
          console.log('No user matches EAT. Error: ', err);
          // TODO: WHAT DOES IOS WANT US TO RETURN HERE FOR FAILURE? FALSE?
          return res.status(401).json({msg: 'please sign in to do that'});
        }

        req.user = user;  // user exists - attach for server use
        next();           // next middleware
      });
    });
  };
};






