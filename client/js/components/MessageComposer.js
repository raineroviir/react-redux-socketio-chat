import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
var socket = io.connect();
import strftime from 'strftime';

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
    const { user } = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      var newMessage = {
        id: Date.now(),
        friendID: this.props.activeFriend,
        text: text,
        user: user.user.username || user.user,  //TODO: clean this code up
        time: strftime('%H:%M %P', new Date())
      }
      //Emit the message to others in the chat room
      socket.emit('new message', newMessage);

      //Save the message to the server
      UserAPIUtils.createMessage(newMessage);

      //Pass the message up to the MainContainer
      this.props.onSave(newMessage);
      this.setState({ text: '' });
    };
  }

  handleChange(event) {
    this.setState({ text: event.target.value});
  }
}
