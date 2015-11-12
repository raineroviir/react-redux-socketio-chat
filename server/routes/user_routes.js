'user strict';

var bodyparser = require('body-parser');
var eatAuth = require('../../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User = require('../models/User.js');
var _ = require("lodash");

module.exports = function loadUserRoutes(router, passport) {
  router.use(bodyparser.json());

  // router.get('/sign_in', passport.authenticate('basic', {session: true}), function(req, res) {
  //     req.user.generateToken(process.env.AUTH_SECRET, function (err, eat) {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).json({msg: 'error generating token'});
  //       }
  //       console.log(req.session);
  //       res.json({eat: eat, username: req.user.username});
  //     });
  //   });

  //get auth credentials from server
  router.get('/load_auth_into_state', function(req, res) {
    console.log(req.user);
    res.json(req.user);
  });

  // Secret API for pulling all usernames:
  router.get('/allusers', function(req, res) {
    User.find({},{username: 1, _id:0}, function(err, data) {
      if(err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  })

  // online users api
  router.get('/online_users', function(req, res) {
    User.find({online: true}, {_id: 0, online: 1, username: 1}, function(err, users) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(users);
    })
  })

  // Check if username in DB
  router.post('/validate_username', function(req, res) {
    User.find({username: req.body.username}, function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).json({msg: 'error validating username'})
      }
      console.log(data);
      if (data.length > 0) {
        res.json({valid: false})
      } else {
        res.json({valid: true})
      }
    }).limit(1)
  })

  // router.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/chat',
  //   failureRedirect: '/signup'
  // }));
  // Create new user
  // router.post('/sign_upOLD', function(req, res) {
  //   // return if confirm password isn't the same as password
  //
  //   if(req.body.password !== req.body.confirmPassword) {
  //     return {warning: 'password and confirmation did not match'}
  //   }
  //   // Explicitly populate user model to avoid overflow exploit
  //   var newUser = new User({
  //     username: req.body.username,
  //     email: req.body.email,
  //     id: uuid.v4(),
  //     online: true
  //   });
  //
  //   // generate hash & save user
  //   newUser.generateHash(req.body.password, function(hash) {
  //     newUser.password = hash;
  //     newUser.save(function(err, user) {
  //       if (err && _.contains(err.errmsg, "$user")) {
  //         return res.status(500).json({success: false, usernamePass: false, emailPass: null, passwordPass: null});
  //       }
  //       if (err && _.contains(err.errmsg, ".email")) {
  //         return res.status(500).json({success: false, usernamePass: true, emailPass: false, passwordPass: null});
  //       }
  //       if (err) {
  //         return res.status(500).json({success: false,  usernamePass: null, emailPass: null, passwordPass: null});
  //       }
  //
  //       user.generateToken(process.env.AUTH_SECRET, function(err, eat) {
  //         if (err) {
  //           console.log('Error signin user in. Error: ', err);
  //           return res.status(500).json({msg: 'error generating token'});
  //         }
  //         console.log(req.session);
  //         res.json({eat: eat, username: newUser.username, id: newUser.id });
  //       });
  //     });
  //   });
  // });

  router.patch('/user_is_offline/:id', function(req, res) {
    User.update({ id: req.params.id }, {
      online: false
    }, function(err, user) {
      if (err) { console.log(err);
      }
      console.log(req.logout());
      req.logout();
      res.json({ updated: true });
    });
  });

};
