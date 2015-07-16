import React, { Component, PropTypes } from 'react';


import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';


var socket = io.connect();
export default class MessageComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        autoFocus='true'
        value={this.state.text}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
      />
    )
  }

  handleSubmit(event) {
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      var newMessage = {
        id: Date.now(),
        friendID: this.props.activeFriend,
        text: text
      }
      this.props.onSave(newMessage);
      this.setState({ text: '' });
    };
  }

  handleChange(event) {
    this.setState({ text: event.target.value});
  }
}
