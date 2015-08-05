import superagent from 'superagent';
import * as Actions from '../actions/Actions';

export function getAllMessages() {
  // simulate retrieving data from a database
  // const rawMessages = JSON.parse(localStorage.getItem('messages'));
  // simulate success callback
  // ChatServerActionCreators.receiveAll(rawMessages);

  superagent
  .get('api/messages')
  .end(function(err, res) {
    if (err) {
      return console.log(err);
    }
    var rawMessages = res.body;
    // console.log(rawMessages);
    receiveRawMessages(rawMessages);
  });

  // function receiveRawMessages(rawMessages) {
  //   rawMessages.forEach(function(message) {
  //     // console.log(message);
  //     // var transformMessage = {
  //     //   id: message._id,
  //     //   friendID: message.friendID,
  //     //   text: message.text
  //     // }
  //     // Actions.addMessage(message.text, message.friendID, message._id);

  //     // console.log(transformMessage);
  //     // Actions.receiveRawMessage(transformMessage);
  //   });
  // }
}

export function createMessage (message) {

  var createdMessage = {
    id: message.id,
    threadID: message.threadID,
    text: message.text,
  };

  superagent
  .post('/api/newmessage')
  .send(message)
  .end(function(err, res) {
    if (err) {
      return console.log(err);
    }
  });
}
