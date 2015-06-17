import TurtleDispatcher from '../dispatcher/TurtleDispatcher';
import TurtleConstants from '../constants/TurtleConstants';

var ActionTypes = TurtleConstants.ActionTypes;

module.exports = {

  receiveAll: function(rawMessages) {
    TurtleDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_MESSAGE,
      rawMessages: rawMessages
    });
  },

  receiveCreatedMessage: function(createdMessage) {
    TurtleDispatcher.dispatch({
      type: ActionTypes.RECEIVE_RAW_CREATED_MESSAGE,
      rawMessage: createdMessage
    })
  }
}
