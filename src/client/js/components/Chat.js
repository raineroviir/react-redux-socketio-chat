import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import { connect } from 'react-redux';
import * as Actions from '../actions/Actions';
import TypingListItem from './TypingListItem';
import UserListItem from './UserListItem';
const socket = io();
import * as UserAPIUtils from '../utils/UserAPIUtils';
import classNames from 'classnames';
import { DropdownButton, MenuItem } from 'react-bootstrap';

// @ is an ES 7 decorator and connect passes the state into the App component

@connect(state => ({
  messages: state.messages.data,
  channels: state.channels.data,
  activeChannel: state.activeChannel,
  user: (state.auth.user.name || state.auth.user),
  typers: state.typers,
  userList: state.userList.data
}))
export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  // componentWillMount is a lifecycle method called right before initial render
  componentWillMount() {
    const { user } = this.props;
    socket.emit('add user', user);
  }

  // componentDidMount is a lifecycle method that is called once right after initial render
  componentDidMount() {
    const { actions } = this.props;
    // The 'new bc message' socket event lets other users connected to the socket listen to the message
    socket.on('new bc message', msg =>
      actions.receiveRawMessage(msg)
    );

    // the stop typing event from other users
    socket.on('typing bc', username =>
      actions.typing(username)
    );

    // the stop typing event from other users
    socket.on('stop typing bc', username =>
      actions.stopTyping(username)
    );

    // this socket event listens to other users joining the channel and appends them to the channel users array
    socket.on('add user bc', username => {
      actions.socketIOAddUser(username);
    });

    // on client disconnect..
    socket.on('client disconnect io', username => {
      actions.userIsOffline(username);
      actions.stopTyping(username);
      const payload = {
        username: username
      };
      UserAPIUtils.userIsOffline(payload);
    });

    socket.on('user logged out', username => {
      actions.userIsOffline(username);
      actions.stopTyping(username);
    });

    socket.on('new channel', channel =>
      actions.receiveRawChannel(channel)
    );
  }

  // componentDidUpdate is a lifecycle method called when the component gets updated, not called on initial render
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  handleSave(newMessage) {
    const { actions } = this.props;
    if (newMessage.text.length !== 0) {
      actions.addMessage(newMessage);
    }
  }

  handleSignOut() {
    const { dispatch, user } = this.props;
    if (user) {
      socket.emit('signOut');
      dispatch(Actions.stopTyping(user));
      dispatch(Actions.userIsOffline(user));
      UserAPIUtils.userIsOffline(user);
    }
    const transitionToWelcome = this.context.router.transitionTo('/welcome');
    dispatch(Actions.signOut())
    .then(transitionToWelcome);
  }

  changeActiveChannel(channel) {
    const { actions } = this.props;
    actions.changeChannel(channel);
  }

  render() {
    const { messages, channels, actions, activeChannel, user, typers, userList} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.name);

    const onlineUsers = userList;
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0'}} className="drop-down-menu">
        <DropdownButton key={4} style={{'border': 'none', 'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={user}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );

    return (
      <div className="container">
        <div className="nav">
          {dropDownMenu}
          <section className="channel-section">
            <Channels onClick={::this.changeActiveChannel} channels={channels} actions={actions} />
          </section>

        </div>
        <div className={classNames('main')}>
          <header className="header">
            {activeChannel.name}
          </header>
          <ul className="message-list" ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          <MessageComposer activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
        <footer style={{background: 'pink'}} >
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
        </footer>
      </div>
    );
  }
}


// users online deprecated for the time being, since i don't have time to fix it will fix next patch
// <section className="user-section">
//   <strong>Users Online</strong>
//   <ul className="user-list">
//     {onlineUsers && onlineUsers.map(onlineUser =>
//       <UserListItem user={onlineUser.username} key={onlineUser.id}/>
//     )}
//   </ul>
// </section>


// old code this can be deleted i think
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
