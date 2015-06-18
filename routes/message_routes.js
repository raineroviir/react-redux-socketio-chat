'use strict';

var Message = require('../models/Message');
var bodyparser = require('body-parser');

module.exports = function (router) {
  router.use(bodyparser.json());
  //get all messages
  router.get('/dashboard', function (req, res) {

    Message.find({}, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({msg: 'internal server error'});
      }
      res.json(data);
    });
  });
  //create message
  router.post('/messages/createmessage', function (req, res) {
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
  router.patch('/messages/patchmessage', function(req, res) {
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
