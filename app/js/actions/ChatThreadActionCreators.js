var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants = require('../constants/ChatConstants');
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  clickThread: function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  },

  createMessage: function(text, currentThreadID, user) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_THREAD,
      text: text,
      currentThreadID: currentThreadID,
      user: user
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID, user);
    ChatWebAPIUtils.createMessage(message, user);
  }
};
