import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from '../components/Channels';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
var socket = io();

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

//componentDidMount is a lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;
    //The 'new bc message' socket event lets other users connected to the socket listen to the message
    socket.on('new bc message', function(msg) {
      actions.receiveRawMessage(msg);
    });
  }

//componentDidUpdate is a lifecycle method called when the component gets updated, not called on initial render
  componentDidUpdate() {
    const messageList = React.findDOMNode(this.refs.messageList);
    messageList.scrollTop = messageList.scrollHeight;
  }

  handleSave(newMessage) {
    const { actions } = this.props;
    if(newMessage.text.length !== 0) {
      actions.addMessage(newMessage);
    }
  }

  changeActiveChannel(channel) {
    const { actions } = this.props;
    actions.changeChannel(channel)
  }

  render() {
    const { messages, channels, actions, activeChannel, user, dispatch } = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.id);

    return (
      <main>
        <div className="message-section">
          <strong>{activeChannel.name}</strong>
          <ul className="message-list" ref="messageList">

            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          <MessageComposer activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
        <div>
          <strong>CHANNELS</strong>
          <Channels onClick={::this.changeActiveChannel} channels={channels} actions={actions} />
        </div>
      </main>
    );
  }
}

@connect(state => ({
  messages: state.messages,
  channels: state.channels,
  activeChannel: state.activeChannel,
  user: state.auth
}))
export default class ChatContainer {
  render() {
    const { messages, channels, activeChannel, dispatch, user} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <Chat {...this.props} actions={actions} />
    );
  }
}
