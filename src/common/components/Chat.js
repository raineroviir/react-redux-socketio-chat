import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import * as Actions from '../actions/Actions';
import * as authActions from '../actions/authActions';
import TypingListItem from './TypingListItem';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.string.isRequired,
    typers: PropTypes.array.isRequired,
    socket: PropTypes.object.isRequired
  };
  componentDidMount() {
    const { actions, socket, user, dispatch } = this.props;
    socket.on('new bc message', msg =>
      actions.receiveRawMessage(msg)
    );
    socket.on('typing bc', user =>
      actions.typing(user)
    );
    socket.on('stop typing bc', user =>
      actions.stopTyping(user)
    );
    socket.on('new channel', channel =>
      actions.receiveRawChannel(channel)
    );
    socket.on('receive socket', socketID => {
      dispatch(authActions.receiveSocket(socketID));
    });
    socket.emit('chat mounted', user);
    socket.on('receive private channel', channel => {
      actions.receiveRawChannel(channel)
    })
  }
  componentDidUpdate() {
    const messageList = this.refs.messageList;
    messageList.scrollTop = messageList.scrollHeight;
  }
  handleSave(newMessage) {
    const { dispatch } = this.props;
    if (newMessage.text.length !== 0) {
      dispatch(Actions.createMessage(newMessage));
    }
  }
  handleSignOut() {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }
  changeActiveChannel(channel) {
    const { actions, socket, activeChannel } = this.props;
    socket.emit('leave channel', activeChannel);
    socket.emit('join channel', channel);
    actions.changeChannel(channel);
  }
  handleSendPrivateMessage(user) {
    const { dispatch, socket } = this.props;
    const sendingUser = this.props.user;
    const newChannel = {
        name: `${user.username}+${sendingUser.username}`,
        id: Date.now()
      };
    dispatch(Actions.createChannel(newChannel));
    this.changeActiveChannel(newChannel);
    socket.emit('new private channel', user.socketID, newChannel);
  }
  render() {
    const { messages, socket, channels, actions, activeChannel, typers, dispatch, user} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel);
    const username = this.props.user.username;
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={1} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={username}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );
    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
        <div className="nav">
          {dropDownMenu}
          <section style={{order: '2', marginTop: '1.5em'}}>
            <Channels socket={socket} onClick={::this.changeActiveChannel} channels={channels} messages={messages} actions={actions} dispatch={dispatch} />
          </section>
        </div>
        <div className="main">
          <header style={{background: '#FFFFFF', color: 'black', flexGrow: '0', order: '0', fontSize: '2.3em', paddingLeft: '0.2em'}}>
            <div>
            {activeChannel}
            <span style={{fontSize: '0.5em', marginLeft: '2em'}}>
            Message Count: {filteredMessages.length}
            </span>
            </div>
          </header>
          <ul style={{wordWrap: 'break-word', margin: '0', overflowY: 'auto', padding: '0', paddingBottom: '1em', flexGrow: '1', order: '1'}} ref="messageList">
            {filteredMessages.map(message =>
              <MessageListItem handleSendPrivateMessage={::this.handleSendPrivateMessage} message={message} key={message.id} />
            )}
          </ul>
          <MessageComposer socket={socket} activeChannel={activeChannel} user={user} onSave={::this.handleSave} />
        </div>
        <footer style={{fontSize: '1em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5'}}>
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
              <TypingListItem username={typers[0]} key={1}/>
              <span> and </span>
              <TypingListItem username={typers[1]} key={2}/>
              <span> are typing</span>
            </span>
          </div>}
          {typers.length > 2 &&
          <div>
            <span>Several people are typing</span>
          </div>}
        </footer>
      </div>
    );
  }
}
