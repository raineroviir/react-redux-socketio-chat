'user strict';

var bodyparser = require('body-parser');
var User = require('../models/User.js');

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  router.get('/auth/facebook', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  router.post('/sign_up', passport.authenticate('local-signup'), function(req, res) {
    res.json(req.user);
  });

  router.post('/sign_in', passport.authenticate('local-login'), function(req, res) {
    res.json(req.user);
  });

  router.get('/signout', function(req, res) {
    req.logout();
    res.end();
  });

  //get auth credentials from server
  router.get('/load_auth_into_state', function(req, res) {
    res.json(req.user);
  });

  // get usernames for validating whether a username is available
  router.get('/allusers', function(req, res) {
    User.find({'local.username': { $exists: true } }, {'local.username': 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data);
    });
  })

  // Check if username in DB
  router.post('/validate_username', function(req, res) {
    User.find({username: req.body.username}, function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).json({msg: 'error validating username'})
      }
      if (data.length > 0) {
        res.json({valid: false})
      } else {
        res.json({valid: true})
      }
    }).limit(1)
  })
};
