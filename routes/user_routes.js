'user strict';

var bodyparser = require('body-parser');
var eatAuth    = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);
var User       = require('../models/User.js');
var _          = require("lodash");
var roleAuth  = require("../lib/role_auth.js");


module.exports = function loadUserRoutes(router) {
  router.use(bodyparser.json());

  // Create new user
  router.post('/users', function(req, res) {
    // Explicitly populate user model to avoid overflow exploit
    var newUser = new User({
      username: req.body.username,
      basic: {
        email: req.body.email
      }
    });

    // generate hash & save user
    newUser.generateHash(req.body.password, function(hash) {
      newUser.basic.password = hash;
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

        res.json({success: true, usernamePass: true, emailPass: true, passwordPass: null});
      });
    });
  });

  // Update user - CURRENTLY UNUSED
  router.patch('/users/:username', eatAuth, function(req, res) {
    console.log('HERE"S THE REQ.BODY FOR UPDATE: ', req.body);
    var updatedUserInfo = req.body;
    delete updatedUserInfo._id;
    delete updatedUserInfo.eat;     // delete encoded token

    if (username !== req.user.username) {  // verify ownership
      console.log('User tried to delete another user.');
      return res.status(401).json({msg: 'Unauthorized.'});
    }

    User.update({'username': req.params.username}, function() {
      switch(true) {
        case !!(err && err.code === 11000):
          return res.json({msg: 'username already exists - please try a different username'});
        case !!(err && err.username):
          return res.json({msg: err.username.message.replace('Path', '')});
        case !!err:
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
      }

      res.json({msg: 'user updated'});
    });
  }); 
	
  router.delete('/users/:username', eatAuth, function(req, res) {
		router.use(adminAuth);
    var username = req.params.username;

    User.findOne({ username: req.params.username }, function (err, user){
      user.suspended = true;
      user.save();
    });

    res.json({msg: "user successfully suspended"});
  });

	router.get('/users', eatAuth, function(req, res){
		User.find({},function(err, data){
			if (err) {
				console.log(err);
				res.status(500).json({success: false, msg: 'server found no users'});
			}
			var userList = [];
			for ( userIndex in data ){
				var user = {};
				user.username = data[userIndex].username;
				user._id = data[userIndex]._id;
				userList.push(user);
			}
 			res.json(userList);	
		});
	});
};
