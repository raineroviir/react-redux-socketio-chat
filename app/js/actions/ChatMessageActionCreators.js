var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants'     );
var ChatWebAPIUtils   = require('../utils/ChatWebAPIUtils'       );
var ChatMessageUtils  = require('../utils/ChatMessageUtils'      );

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  createMessage: function(text, currentThreadID, username, threadname) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID,
      username: username,
      threadname: threadname
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID, username, threadname);
    ChatWebAPIUtils.createMessage(message);
  }

};
