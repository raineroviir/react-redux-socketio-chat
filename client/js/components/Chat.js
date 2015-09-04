import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import superagent from 'superagent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/Actions';
import TypingListItem from './TypingListItem';
import UserListItem from './UserListItem';
const socket = io();
import Footer from './Footer';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired
  }

//componentDidMount is a lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;

    //The 'new bc message' socket event lets other users connected to the socket listen to the message
    socket.on('new bc message', msg =>
      actions.receiveRawMessage(msg)
    );

    //the stop typing event from other users
    socket.on('typing bc', username =>
      actions.typing(username)
    );

    //the stop typing event from other users
    socket.on('stop typing bc', username =>
      actions.stopTyping(username)
    );

    //this socket event listens to other users joining the channel and appends them to the channel users array
    socket.on('add user bc', username =>
      actions.addUserToChannel(username)
    );

    //on client disconnect..
    socket.on('client disconnect io', user => {
      actions.removeUserFromChannel(user)
      actions.stopTyping(user)
      console.log(user);
      const payload = {
        username: user,
        channel: 'Lobby'
      }
      UserAPIUtils.removeUserFromChannel(payload)
    });

    socket.on('user logged out', user => {
      actions.removeUserFromChannel(user);
      actions.stopTyping(user);
    });
  }


//componentWillMount is a lifecycle method called right before initial render
  componentWillMount() {
    const { actions, user} = this.props;
    actions.addUserToChannel(user);
    socket.emit('add user', user);
    const payload = {
      username: user,
      channel: 'Lobby'
    }
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

  handleSignOut() {
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    console.log(user);
    const payload = {
      username: user,
      channel: 'Lobby'
    }
    if(user) {
      socket.emit('signOut');
      actions.stopTyping(user);
      actions.removeUserFromChannel(user)
      UserAPIUtils.removeUserFromChannel(payload)
    }
    actions.signOut();
  }
  changeActiveChannel(channel) {
    const { actions, user } = this.props;
    actions.changeChannel(channel);
  }

  render() {
    const { messages, channels, actions, activeChannel, user, dispatch, typers, channelUserList} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.id);
    // const filteredTypers = typing.filter(user => user.typing === true)
    const filteredChannelUserList = channelUserList;

    const dropDownMenu = (
      <div style={{'width': '21rem', 'position': 'fixed', 'top': '0'}} className='drop-down-menu'>
        <DropdownButton style={{'border':'none', 'width': '21rem'}} id='user-menu'  bsSize='large' bsStyle='primary' title={user || 'USERNAME_HERE'}>
          <MenuItem style={{'width': '21rem'}} eventKey='4' onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );

    return (
      <div className='container'>
        <div className='nav'>
          {dropDownMenu}
          <section className='channel-section'>
            <Channels onClick={::this.changeActiveChannel} channels={channels} actions={actions} />
          </section>
          <section className='user-section'>
            <strong>Users Online</strong>
            <ul className="user-list">
              {filteredChannelUserList.map(user =>
                <UserListItem user={user} key={user.id}/>
              )}
            </ul>
          </section>
        </div>
        <div className={classNames('main')}>
          <header className='header'>
            {activeChannel.name}
          </header>
          <ul className="message-list" ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          <MessageComposer activeChannel={activeChannel} user={user} onSave={::this.handleSave} />

          {typers.length === 1 &&
          <span className="typing-list">
            <TypingListItem username={typers[0]} key={1}/>
            <span> is typing</span>
          </span>}

          {typers.length === 2 &&
          <span className="typing-list">
            <TypingListItem username={typers[0]} key={2}/>
            <span> and </span>
            <TypingListItem username={typers[1]} key={3}/>
            <span> are typing</span>
          </span>}

          {typers.length > 2 &&
          <span className="typing-list">Several people are typing
          </span>}
        </div>
      </div>
    );
  }
}

@connect(state => ({
  messages: state.messages,
  channels: state.channels,
  activeChannel: state.activeChannel,
  user: state.auth.user,
  typers: state.typers,
  channelUserList: state.channelUserList
}))
export default class ChatContainer {
  render() {
    const { messages, channels, activeChannel, dispatch, user, typers} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <Chat {...this.props} actions={actions} />
    );
  }
}

// {typers.length === 2 &&
//   <span className="typing-list"> {typers[0].map(username =>
//   <TypingListItem username={username} typers={typers}/>)} &&
//   <span> and </span> &&
//  {typers[1].map(username =>
//   <TypingListItem username={username} typers={typers}/>
// )} && <span> are typing</span>
// </span>}
//
// {typers.length === 2 &&
//   <span className="typing-list" ref="typersList"> {typers.map(username =>
//     console.log(username)
//     console.log(typers)
//   <TypingListItem username={username} typers={typers}/>)}
//   <span> are typing</span>
// </span>}
