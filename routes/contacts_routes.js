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
  router.post('/contacts/:ownerId', function (req, res) {

    var dynSet = {$set: {}};
    dynSet.$set["friends." + req.body._id] = req.body.friend;
    ContactList.update({listOwnerId: req.params.ownerId}, dynSet, {safe: true, upsert: true}, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json({msg: 'contact added'});
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
