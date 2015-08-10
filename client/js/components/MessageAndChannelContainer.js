import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from '../components/Channels';
import * as ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import superagent from 'superagent';
import { connect } from 'react-redux';
var socket = io();

export default class MessageAndChannelContainer extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

//componentDidMount is a lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;
    socket.on('new bc message', function(msg) {
      console.log("<<NEW BC MESSAGE SOCKET EVENT EMIT>>")
      actions.receiveRawMessage(msg);
    });
  }

//componentDidUpdate is a lifecycle method called when the component gets updated, not called on initial render
  componentDidUpdate() {
    const messageList = React.findDOMNode(this.refs.messageList);
    messageList.scrollTop = messageList.scrollHeight;
    // messageList.scrollIntoView();
  }

  getStateFromServer() {
    const { actions, messages } = this.props;
    superagent
    .get('api/messages')
    .end(function(err, res) {
      if (err) {
        return console.log(err);
      }
      var rawMessages = res.body;
      rawMessages.forEach(function(message) {
        actions.receiveRawMessage(message);
      });
      console.log(messages);
    });
  }

  handleSave(newMessage) {
    const { actions } = this.props;
    if(newMessage.text.length !== 0) {
      actions.addMessage(newMessage);
    }
  }

  changeActiveChannel(channel) {
    console.log('changeActiveChannel in <MessageAndChannelContainer>');
    const { actions } = this.props;
    actions.changeChannel(channel)
  }

  render() {
    // const actions = bindActionCreators(actions, dispatch);
    const { messages, channels, actions, activeChannel, user, dispatch } = this.props;
    // console.log(user);
    // const { filter } = this.state;
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
