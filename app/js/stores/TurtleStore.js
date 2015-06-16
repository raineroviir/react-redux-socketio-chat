import TurtleDispatcher from '../dispatcher/TurtleDispatcher';
import TurtleConstants from '../constants/TurtleConstants';
import TurtleUtils from '../utils/TurtleUtils';
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _messages = {};

function createMsg(text) {
  var id = Date.now();
  console.log(id);
  _messages[id] = {
    id: id,
    text: text
  }
  console.log(_messages);
}

var TurtleStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll: function() {
    return _messages
  },

  getAllForThread: function() {
    var threadMessages = [];
    for (var id in _messages) {
      if (true) {
      threadMessages.push(_messages[id]);
      }
    }
    return threadMessages;
  }

});

TurtleDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case TurtleConstants.CREATE_MESSAGE:
      var message = TurtleUtils.getCreatedMessageData(
        action.text
      );
      _messages[message.id] = message;
      TurtleStore.emitChange();
    break;

  default:

  }
});

module.exports = TurtleStore;
