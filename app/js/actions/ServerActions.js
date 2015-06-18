var TurtleDispatcher = ('../dispatcher/TurtleDispatcher');
var TurtleConstants  = ('../constants/TurtleConstants'  );

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
