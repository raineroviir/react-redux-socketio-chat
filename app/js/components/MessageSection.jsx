var React = require('react');
var MessageStore = require('../stores/MessageStore'  );
var ThreadStore = require('../stores/ThreadStore'    );
var MessageComposer = require('./MessageComposer.jsx');
var MessageListItem = require('./MessageListItem.jsx');

function getStateFromStores() {
  return {
    messages: MessageStore.getAllForCurrentThread(),
    thread: ThreadStore.getCurrent()
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
    this._scrollToBottom();
    MessageStore.addChangeListener(this._onChange);
    ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
    ThreadStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var messageListItems = this.state.messages.map(getMessageListItem);
    return (
      <div className="message-section">
        <h3 className="message-thread-heading">{this.state.thread.name}</h3>
        <ul className="message-list" ref="messageList">
          {messageListItems}
        </ul>
        <MessageComposer threadID={this.state.thread.id} threadName={this.state.thread.name} messaGes={this.state.messages}/>
      </div>
    )
  },

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }
})

module.exports = MessageSection;
