'user strict';

var bodyparser = require('body-parser');
var eatAuth = require('../../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User = require('../models/User.js');
var _ = require("lodash");
module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  //Log In
  // router.get('/log_in', passport.authenticate('basic', {session: false}), function(req, res) {
  //   req.user.generateToken(process.env.AUTH_SECRET, function(err, eat) {  // passport_strategy adds req.user
  //     if (err) {
  //       console.log('Error signin user in. Error: ', err);
  //       return res.status(500).json({success: false, eat: null, msg: 'error logging in'});
  //     }
  //     console.log('hit login route');
  //     res.json({eat: eat});
  //
  //   });
  // });

  router.get('/log_in', passport.authenticate('basic', {session: false}), function(req, res) {
      req.user.generateToken(process.env.AUTH_SECRET, function (err, eat) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'error generating token'});
        }
        res.json({eat: eat, username: req.user.username});
      });
    });

  // Create new user
  router.post('/create_user', function(req, res) {
    // return if confirm password isn't the same as password

    if(req.body.password !== req.body.confirmPassword) {
      return {warning: 'password and confirmation did not match'}
    }
    // Explicitly populate user model to avoid overflow exploit
    var newUser = new User({
      username: req.body.username,
      email: req.body.email
    });

    // generate hash & save user
    newUser.generateHash(req.body.password, function(hash) {
      newUser.password = hash;
      newUser.save(function(err, user) {
        if (err && _.contains(err.errmsg, "$user")) {
          return res.status(500).json({success: false, usernamePass: false, emailPass: null, passwordPass: null});
        }
        if (err && _.contains(err.errmsg, ".email")) {
          return res.status(500).json({success: false, usernamePass: true, emailPass: false, passwordPass: null});
        }
        if (err) {
          return res.status(500).json({success: false,  usernamePass: null, emailPass: null, passwordPass: null});
        }

        user.generateToken(process.env.AUTH_SECRET, function(err, eat) {
          if (err) {
            console.log('Error signin user in. Error: ', err);
            return res.status(500).json({msg: 'error generating token'});
          }
          console.log('hit token generation');
          res.json({eat: eat, username: newUser.username});

        });
      });
    });
  });
};
