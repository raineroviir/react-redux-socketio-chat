var React = require('react');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  PropTypes: {
    message: ReactPropTypes.object
  },

  render: function() {
    var message = this.props.message;
    return (
      <li className="message-list-item">
      <h5 className="message-author-name">{message.authorName}</h5>
        <h6 className="message-id">{message.id}</h6>
        <div className="message-time">
        {message.date.toLocaleTimeString()}
        </div>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
});

module.exports = MessageListItem;
