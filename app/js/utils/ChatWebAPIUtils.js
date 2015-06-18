var ChatServerActionCreators = require('../actions/ChatServerActionCreators');
var request = require('superagent');
// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {

  getAllMessages: function() {
    // simulate retrieving data from a database
    var rawMessages = JSON.parse(localStorage.getItem('messages'));

    var serverReq =
      request
        .get('/api/dashboard')
        .end(function(err, res) {
          if(err) {
            return console.log(err);
          }
          ChatServerActionCreators.receiveAll(res.body);
        }.bind(this));
      ChatServerActionCreators.receiveAll(rawMessages);


    // simulate success callback

  },

  createMessage: function(message, threadName) {
    // simulate writing to a database

    console.log('ChatWebAPICreateMsg()');
    // var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var threadName = message.authorName
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp,
      users: message.authorName
    };

    request
    .post('/api/messages/createmessage')
    .send(createdMessage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }.bind(this));

    // rawMessages.push(createdMessage);
    // localStorage.setItem('messages', JSON.stringify(rawMessages));
  },

  updateMessageOwners: function(message) {
    var patchpackage = {
      username: message.authorName,
      threadID: message.threadID
    request
    .patch('/api/messages/patchmessage')
    .send(patchpackage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      console.log('.patch() !');

    })
  }

};
