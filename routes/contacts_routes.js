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
