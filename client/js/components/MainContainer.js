import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/Filters';

import FriendContainer from '../components/FriendContainer';

import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import superagent from 'superagent';

var socket = io.connect();

// const THREAD_FILTER = {
//   [SHOW_ALL]: () => true,
//   [SHOW_UNMARKED]: message => message.friendID === activeFriend
//   // [SHOW_MARKED]: () => true
// };
// this.socket = io();

export default class MainContainer extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

//  Set the initial state for which friend is active?

  // constructor(props, context) {
  //   super(props, context);
  //   this.state = { filter: SHOW_UNMARKED };
  // }

//  Save the message written in the message composer

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
    if(text.length !== 0) {
      this.props.actions.addMessage(newMessage);
      //Emit the message to others in the chat room
      socket.emit('new message', newMessage);

      //Save the message to the server
      ChatWebAPIUtils.createMessage(newMessage);
    }
  }


  // handleShow(friend) {
  //   this.setState({ activeFriendID: friend });
  // }

  // getCurrentFriendID() {
  //   return this.state.activeFriendID;
  // }

  // // run through local state
  // changeActiveFriend(friendID) {
  //   this.setState({activeFriendID: friendID})
  //   alert('hit');
  // }

  //run through activefriend state & action creator
  changeActiveFriend(friendID) {
    const { actions } = this.props;
    actions.activateFriend(friendID)
  }

  render() {
    const { messages, friends, actions, activeFriend } = this.props;
    socket.on('new bc message', messageReceive);
    function messageReceive(msg) {
      actions.receiveRawMessage(msg);
    }

    // const { filter } = this.state;
    const filteredMessages = messages.filter(message => message.friendID === activeFriend);
    return (
      <main>
        <div className="message-section">
          <ul className="message-list">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} {...actions} />
            )}
          </ul>
          <MessageComposer activeFriend={activeFriend} onSave={::this.handleSave} />
        </div>
        <div>
        <FriendContainer onClick={::this.changeActiveFriend} friends={friends} actions={actions} />
        </div>
        <div>
          <button onClick={::this.getStateFromServer}>Get All</button>
        </div>
      </main>
    );
  }
}
