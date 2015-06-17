var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  createMessage: function(text, currentThreadID, user) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID,
      user: user
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID, user);
    ChatWebAPIUtils.createMessage(message, user);
  }

};
