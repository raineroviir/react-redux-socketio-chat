import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import FriendContainer from '../components/FriendContainer';
import * as ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
import superagent from 'superagent';
import { connect } from 'react-redux';
var socket = io();

// const THREAD_FILTER = {
//   [SHOW_ALL]: () => true,
//   [SHOW_UNMARKED]: message => message.friendID === activeFriend
//   // [SHOW_MARKED]: () => true
// };
// this.socket = io();
// @connect(state => ({
//   user: state.auth.user
// }))

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

  // constructor(props, context) {
  //   super(props, context);
  //   this.props = {
  //     activeFriend: 0
  //   };
  // }

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
        <FriendContainer onClick={::this.changeActiveFriend} friends={friends} actions={actions} />
        </div>
        <div>
          <button onClick={::this.getStateFromServer}>Get All</button>
        </div>
      </main>
    );
  }
}
