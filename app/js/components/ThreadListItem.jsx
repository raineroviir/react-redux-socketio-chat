var React = require('react');
var ReactPropTypes = React.PropTypes;
var ChatThreadActionCreators = require('../actions/ChatThreadActionCreators');
var cx = require('react/lib/cx');

var ThreadListItem = React.createClass({

  propTypes: {
    thread: ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
  },

  render: function() {
    var thread = this.props.thread;
    var lastMessage = thread.lastMessage;
    return (
      <li
        className={cx({
          'thread-list-item': true,
          'active': thread.id === this.props.currentThreadID
        })}
        onClick={this._onClick}>
      <h5 className="thread-name">{thread.name}</h5>
      <div className="thread-time">
        {lastMessage.date.toLocaleTimeString()}
      </div>
      <div className="thread-last-message">
        {lastMessage.text}
      </div>
      </li>
      )
  },

  _onClick: function() {
    ChatThreadActionCreators.clickThread(this.props.thread.id)
  }
})

module.exports = ThreadListItem;
