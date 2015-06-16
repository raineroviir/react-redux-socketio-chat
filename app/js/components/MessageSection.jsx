var React = require('react');
import TurtleStore from '../stores/TurtleStore';
import MessageComposer from './MessageComposer.jsx';
import MessageListItem from './MessageListItem.jsx';

function getStateFromStores() {
  return {
    messages: TurtleStore.getAllForThread()
  };
}

function getMessageListItem(message) {
  return (
    <MessageListItem
      key={message.id}
      message={message}
    />
  );
}

var MessageSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TurtleStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TurtleStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log(this.state.messages);
    var messageListItems = this.state.messages.map(getMessageListItem);
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">Placeholder thread name</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer />
      </div>
      )
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
})

module.exports = MessageSection;
