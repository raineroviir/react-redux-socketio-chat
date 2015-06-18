'use strict';

var bodyparser = require('body-parser'       );
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js' );

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  // Existing user login
  router.get('/log_in', passport.authenticate('basic', {session: false}), function(req, res) {
    req.user.generateToken(process.env.AUTH_SECRET, function(err, eat) {  // passport_strategy adds req.user
      if (err) {
        console.log('Error signin user in. Error: ', err);
        return res.status(500).json({success: false, eat: null, msg: 'error logging in'});
      }
			console.log('hit login route');
      res.json({success: true, eat: eat, username: req.user.username});

    });
  });
};
