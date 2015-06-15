'use strict';

var ContactList = require('../models/ContactList');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());

  // create route to show all contacts
  router.get('/contacts/', function (req, res) {
    //find contacts
    ContactList.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

}
