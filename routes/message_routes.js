'use strict';

var Message = require('../models/Message');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth.js')(process.env.AUTH_SECRET);

module.exports = function (router) {
  router.use(bodyparser.json());
  //get all messages
  router.get('/dashboard', eatAuth, function (req, res) {

    Message.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  router.get('/dashboard/:user', eatAuth, function (req, res) {

    Message.find({users: req.params.user}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      console.log(data);
      res.json(data);
    });
  });

  //create message
  router.post('/messages/createmessage', eatAuth, function (req, res) {
    var newMessage = new Message(req.body);
    newMessage.save(function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });

  //edit messages
  router.patch('/messages/patchmessage', eatAuth, function(req, res) {
    var threadID = req.body.threadID
    var userToBeAdded = req.body.username
    if (err) {
      console.log(err);
      return res.status(500).json({msg: 'internal server error'});
    }

    Message.update({'threadID': threadID}, { $push: {users: usersToBeAdded } })
    console.log('message updated');
  });
}
