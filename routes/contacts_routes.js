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
  router.post('/contacts/makelist', function (req, res) {
    var newContactList = new ContactList(req.body);

    newContactList.save(function (err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({msg: 'internal server error'});
      }
      // display saved data
      res.json(data);
    });

  });

};
