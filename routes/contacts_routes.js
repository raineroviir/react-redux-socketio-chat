'use strict';

var ContactList = require('../models/ContactList');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());

  // create route to show all contacts
  router.get('/contacts/:ownerId', function (req, res) {
    //find contacts
    ContactList.find({listOwnerId: req.params.ownerId}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  // create temporary route to make test contact list
  router.post('/contacts/request', function (req, res) {

    var dynSet = {$set: {}};
    dynSet.$set['sentRequests.' + req.body.to.user_id] = {name: req.body.to.name};
    ContactList.update({listOwnerId: req.body.from.user_id}, dynSet, {safe: true, upsert: true}, function (err, data) {
      if (err) {
        console.log(err);
      }
    });

    var dynSet2 = {$set: {}};
    dynSet2.$set['receivedRequests.' + req.body.from.user_id] = {name: req.body.from.name};
    ContactList.update({listOwnerId: req.body.to.user_id}, dynSet2, {safe: true, upsert: true}, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json({msg: 'contact request sent'});
    });

  });

  router.delete('/contacts/requests/deny/', function (req, res) {

    var dynSet = {$set: {}};
    var key = 'friends.' + req.body.to_user_id;
    var delobj = {};
    delobj[key] = '';
    ContactList.update({listOwnerId: req.params.ownerId}, {$unset: delobj} , null , function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json({msg: 'contact removed'});
    });

  });

  router.post('/contacts/requests/accept/', function (req, res) {

    // get reqest and move to freinds
    ContactList.find({listOwnerId: req.body.from_user_id}, function (err, data){
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'server failed to complete your request'});
      }

      if (!data[0].receivedRequests[req.body.to_user_id]){
        return res.status(400).json({msg: 'friend request not found'});
      }
      console.log('data[0]', data[0])
      var userToAdd = data[0].receivedRequests[req.body.to_user_id];
      console.log('user to add', userToAdd);
      var dynSet = {$set:userToAdd};

      dynSet.$set['friends.' + req.body.to_user_id] = {name: userToAdd.name};
      ContactList.update({listOwnerId: req.body.from_user_id}, dynSet ,null , function (err, data){
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'server failed to complete your request'});
        }
        // res.status(200).json({success: true});

        var reckey = 'receivedRequests.' + req.body.to_user_id;
        var sentkey = 'sentRequests.' + req.body.from_user_id;
        var recDelobj = {};
        var sentDelobj = {};
        recDelobj[reckey] = '';
        sentDelobj[sentkey] = '';

        console.log(req.body.from_user_id, 'rec del obj ', recDelobj );
                console.log(req.body.to_user_id, 'rec del obj ', sentDelobj );

        console.log('sent del obj', sentDelobj);
        ContactList.update({listOwnerId: req.body.from_user_id}, {$unset: recDelobj} , null , function (err, data) {
          if (err) {
            console.log(err);
            return res.status(500).json({success: false});
          }
          console.log('this happend')
          ContactList.update({listOwnerId: req.body.to_user_id}, {$unset: sentDelobj} , null , function (err, data) {
            if (err) {
              console.log(err);
              res.status(500).json({success: false});
           }
            console.log('this  also happend')
            return res.json({msg: 'contact removed'});
          });
        });

      });
    });
    // delete request to remove from pending lists

  });


  router.delete('/contacts/:ownerId', function (req, res) {

    var dynSet = {$set: {}};
    var key = 'friends.' + req.body._id;
    var delobj = {};
    delobj[key] = '';
    ContactList.update({listOwnerId: req.params.ownerId}, {$unset: delobj} , null , function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json({msg: 'contact removed'});
    });

  });

};
