import TurtleDispatcher from '../dispatcher/TurtleDispatcher';
import TurtleConstants from '../constants/TurtleConstants';
import TurtleUtils from '../utils/TurtleUtils';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
var ActionTypes = TurtleConstants.ActionTypes;

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
