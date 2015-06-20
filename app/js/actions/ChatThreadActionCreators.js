var ChatAppDispatcher = require('../dispatcher/ChatAppDispatcher');
var ChatConstants     = require('../constants/ChatConstants'     );
var ChatWebAPIUtils   = require('../utils/ChatWebAPIUtils'       );
var ChatMessageUtils  = require('../utils/ChatMessageUtils'      );

var ActionTypes = ChatConstants.ActionTypes;

module.exports = {

  clickThread: function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    });
  },

  createThread: function(text, currentThreadID, user, sendMessageTo) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.CREATE_THREAD,
      text: text,
      currentThreadID: currentThreadID,
      users: [user, sendMessageTo]
    });
    var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID, user, sendMessageTo);
    ChatWebAPIUtils.createMessage(message, user);
  },

  makeActive: function(threadID) {
    ChatAppDispatcher.dispatch({
      type: ActionTypes.MAKE_ACTIVE,
      threadID: threadID
    });
  }
};
