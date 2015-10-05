import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
const socket = io.connect();
import strftime from 'strftime';

export default class MessageComposer extends Component {

  static propTypes = {
    activeChannel: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: '',
      typing: false
    };
  }

  handleSubmit(event) {
    const { user } = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      var newMessage = {
        id: Date.now(),
        channelID: this.props.activeChannel.name,
        text: text,
        user: user,
        time: strftime('%H:%M %p', new Date())
      };
      // Emit the message to others in the chat room
      socket.emit('new message', newMessage);

      // Save the message to the server
      UserAPIUtils.createMessage(newMessage);

      // Pass the message up to the Chat component
      this.props.onSave(newMessage);
      this.setState({ text: '', typing: false });
      socket.emit('stop typing');
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
    if (event.target.value.length > 0 && !this.state.typing) {
      socket.emit('typing');
      this.setState({ typing: true});
    }
    if (event.target.value.length === 0 && this.state.typing) {
      socket.emit('stop typing');
      this.setState({ typing: false});
    }
  }

  render() {
    const messageComposerStyle = {
      zIndex: '52',
      height: '4rem',
      left: '21.1rem',
      right: '1rem',
      background: '#fff',
      boxSizing: 'border-box',
      display: 'block',
      width: '100%',
      flexShrink: '0',
      order: '2'
    };
    return (
      <textarea
        style={messageComposerStyle}
        name="message"
        autoFocus="true"
        value={this.state.text}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
      />
    );
  }
}
