var TurtleDispatcher = require('../dispatcher/TurtleDispatcher');
var TurtleConstants  = require('../constants/TurtleConstants'  );

var ActionTypes      = TurtleConstants.ActionTypes;

var ThreadActions = {

  clickThread: function(threadID) {
    TurtleDispatcher.dispatch({
      type: ActionTypes.CLICK_THREAD,
      threadID: threadID
    })
  },

  createThread: function(name) {
    TurtleDispatcher.dispatch({
      actionType: TurtleConstants.CREATE_THREAD,
      name: name
    })
  }
}

module.exports = ThreadActions;
