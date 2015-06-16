var React = require('react');

var ReactPropTypes = React.PropTypes;

var MessageListItem = React.createClass({

  render: function() {
    var message = this.props.message;
    return (
      <li className="message-list-item">
        <h5 className="message-id">{message.id}</h5>
        <div className="message-text">{message.text}</div>
      </li>
    );
  }
});

module.exports = MessageListItem;
