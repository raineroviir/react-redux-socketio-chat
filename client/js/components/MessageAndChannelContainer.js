import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from '../components/Channels';
import * as ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import superagent from 'superagent';
import { connect } from 'react-redux';
var socket = io();

export default class MainContainer extends Component {

  // static propTypes = {
  //   messages: PropTypes.array.isRequired,
  //   actions: PropTypes.object.isRequired
  // }

//lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;
    socket.on('new bc message', function(msg) {
      actions.receiveRawMessage(msg);
    });
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


  //run through activefriend state & action creator
  changeActiveFriend(friendID) {
    const { actions } = this.props;
    actions.activateFriend(friendID)
  }

  render() {
    // const actions = bindActionCreators(actions, dispatch);
    const { messages, friends, actions, activeFriend, user, dispatch } = this.props;
    // console.log(user);
    // const { filter } = this.state;
    const filteredMessages = messages.filter(message => message.friendID === activeFriend);
    return (
      <main>
        <div className="message-section">
          <ul className="message-list">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          <MessageComposer activeFriend={activeFriend} user={user} onSave={::this.handleSave} />
        </div>
        <div>
          <Channels onClick={::this.changeActiveFriend} friends={friends} actions={actions} />
        </div>
      </main>
    );
  }
}
