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
  router.post('/contacts/makelist/:ownerId', function (req, res) {

    var newFriend = req.body.friend;
    var dynSet = {$set: {}};
    dynSet.$set["friends." + req.body._id] = req.body.friend;
    ContactList.update({listOwnerId: req.params.ownerId}, dynSet, {safe: true, upsert: true}, function (err, data) {
      if (err) {
        console.log(err);
      }
      res.json(data);
    })

  });

  // router.delete('/contacts/:ownerId', function (req, res) {
  //   var tmpId = req.body.idToRemove;
  //   ContactList.update({listOwnerId: req.params.ownerId}, {$unset: {friends.tmpId: 1}}, function (err, data) {
  //     if (err) {
  //       console.log(err);
  //       return res.status(500).json({msg: 'internal server error'});
  //     }
  //     res.json({msg: 'contact deleted'});
  //   });
  // });

};
