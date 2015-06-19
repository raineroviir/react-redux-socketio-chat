var TurtleDispatcher = require('../dispatcher/TurtleDispatcher');
var TurtleConstants  = require('../constants/TurtleConstants'  );
var TurtleUtils      = require('../utils/TurtleUtils'          );
var ChatWebAPIUtils  = require('../utils/ChatWebAPIUtils'      );

var ActionTypes      = TurtleConstants.ActionTypes;

var TurtleActions = {

  createMessage: function(text, currentThreadID) {
    TurtleDispatcher.dispatch({
      actionType: TurtleConstants.CREATE_MESSAGE,
      text: text,
      currentThreadID: currentThreadID
    });
    var message = TurtleUtils.getCreatedMessageData(text, currentThreadID);
    ChatWebAPIUtils.createMessage(message);
  }

}

module.exports = TurtleActions;
