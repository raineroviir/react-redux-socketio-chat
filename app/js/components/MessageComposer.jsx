var React = require('react');

import ChatMessageActionCreators from '../actions/ChatMessageActionCreators';
var Cookies = require('cookies-js');

var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;
var MessageComposer = React.createClass({

  propTypes: {
    threadID: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {text: ''};
  },
  render: function() {
    return (
      <textarea
        className="message-composer"
        name="message"
        value={this.state.text}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
      />
    )
  },

  _onChange: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      var text = this.state.text.trim();
      var username = Cookies.get('username');
      if (text) {
        ChatMessageActionCreators.createMessage(text, this.props.threadID, username);
      }
      this.setState({text: ''});
    }
  }

});

module.exports = MessageComposer;
