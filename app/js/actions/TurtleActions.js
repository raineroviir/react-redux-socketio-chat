import TurtleDispatcher from '../dispatcher/TurtleDispatcher';
import TurtleConstants from '../constants/TurtleConstants';

var TurtleActions = {

  createMsg: function(text) {
    TurtleDispatcher.dispatch({
      actionType: TurtleConstants.CREATE_MESSAGE,
      text: text
    });
  }
}

module.exports = TurtleActions;
