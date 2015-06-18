'use strict';

var ContactList = require('../models/ContactList');
var bodyparser = require('body-parser');
var User = require('../models/User.js');
var eatAuth = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);

module.exports = function (router) {
  router.use(bodyparser.json());

  // create route to show all contact[MaA[M`A[M`${HOME}/.bashrc s
  router.get('/contacts', eatAuth, function (req, res) {
    //find contacts
    ContactList.find({listOwnerId: req.user._id}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({success: false, msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // create temporary route to make test contact list
  router.post('/contacts/request', eatAuth, function (req, res) {
		console.log('hit post /contacts/request');
		User.find({_id: req.body.user_id}, function(err, data){
			if (err) {
				console.log(err);
				return res.status(500).json({success: false, msg: 'could not find user'});
			}
			//return res.status(200).json({status: 'lulwat'});

			var dynSet = {$set: {}};
			dynSet.$set['sentRequests.' + req.body.user_id] = {name: data.username};
			ContactList.update({listOwnerId: req.user._id}, dynSet, {safe: true, upsert: true}, function (err, data) {
				if (err) {
					console.log(err);
					return res.status(500).json({success: false, msg: 'server failed to comlete request'});
				}
				var dynSet2 = {$set: {}};
				dynSet2.$set['receivedRequests.' + req.user._id] = {name: req.user.username};
				ContactList.update({listOwnerId: req.body.user_id}, dynSet2, {safe: true, upsert: true}, function (err, data) {
					if (err) {
						console.log(err);
						return res.status(500).json({success: false, msg: 'server failed to comlete request'});
					}
					res.json({success: true, msg: 'contact request sent'});
				});
			});
		});

  });

  router.delete('/contacts/request/deny/', eatAuth, function (req, res) {
		console.log('hit delete /contacts/request/deny/');

    var dynSet = {$set: {}};
    var key = 'friends.' + req.body.user_id;
    var delobj = {};
    delobj[key] = '';
    ContactList.update({listOwnerId: req.user._id}, {$unset: delobj} , null , function (err, data) {
      if (err) {
        console.log(err);
				return res.status(500).json({success: false, msg: 'server failed to complete request'});
      }
      res.json({success: true, msg: 'contact removed'});
    });

  });

  router.post('/contacts/request/accept/', eatAuth,  function (req, res) {
		console.log('/contacts/request/accept/');

    // get reqest and move to freinds
    ContactList.find({listOwnerId: req.user._id}, function (err, data){
      if (err) {
        console.log(err);
        return res.status(500).json({success: true, msg: 'server failed to complete your request'});
      }

      if (!data[0].receivedRequests[req.body.user_id]){
        return res.status(400).json({success: false, msg: 'friend request not found'});
      }
      var userToAdd = data[0].receivedRequests[req.body.user_id];
      var dynSet = {$set:userToAdd};
			console.log('user to add', userToAdd);

      dynSet.$set['friends.' + req.body.user_id] = {name: userToAdd.name};
      ContactList.update({listOwnerId: req.body.from_user_id}, dynSet ,null , function (err, data){
        if (err) {
          console.log(err);
          return res.status(500).json({success: false, msg: 'server failed to complete your request'});
        }
        // res.status(200).json({success: true});

        var reckey = 'receivedRequests.' + req.body.user_id;
        var sentkey = 'sentRequests.' + req.user._id;
        var recDelobj = {};
        var sentDelobj = {};
        recDelobj[reckey] = '';
        sentDelobj[sentkey] = '';

        ContactList.update({listOwnerId: req.user._id}, {$unset: recDelobj} , null , function (err, data) {
          if (err) {
            console.log(err);
            return res.status(500).json({success: false, msg: 'server failed to complete request'});
          }
          ContactList.update({listOwnerId: req.body.user_id}, {$unset: sentDelobj} , null , function (err, data) {
            if (err) {
              console.log(err);
              res.status(500).json({success: false, msg: 'server failed to complete request'});
           }
            return res.json({success: true, msg: 'contact removed'});
          });
        });

      });
    });
    // delete request to remove from pending lists

  });


  router.delete('/contacts/', eatAuth,  function (req, res) {
		console.log('hit delete	/contacts/');

    var dynSet = {$set: {}};
    var key = 'friends.' + req.body.user_id;
    var delobj = {};
    delobj[key] = '';
    ContactList.update({listOwnerId: req.user._id}, {$unset: delobj} , null , function (err, data) {
      if (err) {
        console.log(err);
				return res.status(500).json({success: false, msg: 'server failed to complete request'});
      }
      res.json({success: true, msg: 'contact removed'});
    });

  });

};
