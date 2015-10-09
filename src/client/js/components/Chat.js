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
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { isLoaded } from '../reducers/auth';
import { Modal, Jumbotron } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired,
    onlineUsers: PropTypes.array.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      moreUsersModal: false
    }
  }
  // componentWillMount is a lifecycle method called right before initial render
  componentWillMount() {
    const { user } = this.props;
    console.log(user);
    socket.emit('user online', user);
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
    socket.on('user online', username => {
      console.log(username);
      const userObj = {
        username: username,
        id: Date.now()
      }
      actions.receiveUserOnline(userObj);
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

    socket.on('disconnect bc', username => {
      console.log('user disconnected from componentWillUnMount');
      actions.userIsOffline(username);
      UserAPIUtils.userIsOffline(username);
    });
  }

  // componentWillUnMount() {
  //   const { actions } = this.props;
  //   socket.on('user disconnected', username => {
  //     console.log('user disconnected from componentWillUnMount');
  //     actions.userIsOffline(username);
  //   })
  // }

  // componentDidUpdate is a lifecycle method called when the component gets updated, not called on initial render
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }

  componentWillUnMount() {
    const { user } = this.props;
    console.log(user);
    socket.emit('disconnect', user);
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
    console.log(MessageComposer);
    actions.changeChannel(channel);
  }

  openMoreUsersModal() {
    event.preventDefault();
    this.setState({moreUsersModal: true});
  }

  closeMoreUsersModal() {
    event.preventDefault();
    this.setState({moreUsersModal: false});
  }

  render() {
    const { messages, channels, actions, activeChannel, user, typers, onlineUsers} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.name);

    const filteredUsers = onlineUsers.slice(0, 8);
    const moreUsersBoolean = onlineUsers.length > 8;
    const restOfTheUsers = onlineUsers.slice(8);

    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={4} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={user}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );

    const moreUsersModal = (
      <div style={{background: 'grey'}}>
        <Modal key={2} show={this.state.moreUsersModal} onHide={::this.closeMoreUsersModal}>
          <Modal.Header closeButton >
            <Modal.Title>More Users</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul style={{height: 'auto', margin: '0', overflowY: 'auto', padding: '0'}}>
              {restOfTheUsers.map(onlineUser =>
                <UserListItem user={onlineUser.username} key={onlineUser.id}/>
              )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={::this.closeMoreUsersModal}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );

    const noMessagesJumbotron = (
      <Jumbotron style={{paddingLeft: '1em', height: '100%'}}>
        <div>
          <h1> There are no messages in this channel :(</h1>
          <p> Add a message by using the message composer (the white box) at the bottom of your screen and make the channel happy :)
          </p>
        </div>
      </Jumbotron>
    )

    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
        <div className="nav">
          {dropDownMenu}
          <section style={{order: '2', marginTop: '1.5em'}}>
            <Channels onClick={::this.changeActiveChannel} channels={channels} messages={messages} actions={actions} />
          </section>
          <section style={{order: '3', marginTop: '1.5em'}}>
            <span style={{paddingLeft: '0.8em', fontSize: '1.5em'}}>Online Users</span>
            <ul style={{height: 'auto', overflowY: 'auto', width: '100%', listStyle: 'none'}}>
              {filteredUsers && filteredUsers.map(onlineUser =>
                <UserListItem user={onlineUser.username} key={onlineUser.id}/>
              )}
            </ul>
            {moreUsersBoolean && <a onClick={::this.openMoreUsersModal} style={{'cursor': 'pointer', 'color': '#85BBE9'}}> + {onlineUsers.length - 8} more...</a>}
            {moreUsersModal}
          </section>
        </div>
        <div className="main">
          <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
            <div>
            {activeChannel.name}
            <span style={{fontSize: '0.5em', marginLeft: '2em'}}>
            Message Count: {filteredMessages.length}
            </span>
            </div>

          </header>
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', width: '100%', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} user={user} actions={actions} />
            )}
          </ul>
          {filteredMessages.length === 0 && noMessagesJumbotron}
          <MessageComposer activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
        <footer style={{fontSize: '0.9em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5'}}>
          {typers.length === 1 &&
          <div>
              <span>
                <TypingListItem username={typers[0]} key={1}/>
                <span> is typing</span>
              </span>
            </div>}
          {typers.length === 2 &&
          <div>
            <span>
              <TypingListItem username={typers[0]} key={2}/>
              <span> and </span>
              <TypingListItem username={typers[1]} key={3}/>
              <span> are typing</span>
            </span>
          </div>}
          {typers.length > 2 &&
          <div>
            <span>Several people are typing
            </span>
          </div>}
        </footer>
      </div>
    );
  }
}
