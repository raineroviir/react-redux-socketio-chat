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
    // var rawMessages = JSON.parse(localStorage.getItem('messages'));

    var serverReq =
      request
        .get('/api/messages/getmessages')
        .end(function(err, res) {
          if(err) {
            return console.log(err);
          }
          var rawMessages = res.body;
          console.log('server hit get');

        }.bind(this));

      ChatServerActionCreators.receiveAll(rawMessages);
        console.log(serverReq);
    // simulate success callback

  },

  createMessage: function(message, threadName) {
    // simulate writing to a database



    var rawMessages = JSON.parse(localStorage.getItem('messages'));
    var timestamp = Date.now();
    var id = 'm_' + timestamp;
    var threadID = message.threadID || ('t_' + Date.now());
    var threadName = threadName || message.authorName
    var createdMessage = {
      id: id,
      threadID: threadID,
      threadName: threadName,
      authorName: message.authorName,
      text: message.text,
      timestamp: timestamp,
    };

    request
    .post('/api/messages/createmessage')
    .send(createdMessage)
    .end(function(err, res) {
      if(err) {
        return console.log(err);
      }
      console.log(res);
      console.log('server post msg hit');
    }.bind(this));



    rawMessages.push(createdMessage);
    localStorage.setItem('messages', JSON.stringify(rawMessages));

    // simulate success callback
    setTimeout(function() {
      ChatServerActionCreators.receiveCreatedMessage(createdMessage);
    }, 0);
  }

};

