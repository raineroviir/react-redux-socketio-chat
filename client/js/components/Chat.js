import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import Channels from './Channels';
import * as Actions from '../actions/Actions';
import TypingListItem from './TypingListItem';
const socket = io();
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class Chat extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired
  }
  componentDidMount() {
    const { actions } = this.props;
    socket.on('new bc message', msg =>
      actions.receiveRawMessage(msg)
    );
    socket.on('typing bc', username =>
      actions.typing(username)
    );
    socket.on('stop typing bc', username =>
      actions.stopTyping(username)
    );
    socket.on('new channel', channel =>
      actions.receiveRawChannel(channel)
    );
    if (!this.props.user.username) {
      actions.loadAuth();
    }
  }
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
    const { dispatch } = this.props;
    dispatch(Actions.signOut());
  }
  changeActiveChannel(channel) {
    const { actions } = this.props;
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
    const { messages, channels, actions, activeChannel, typers} = this.props;
    const filteredMessages = messages.filter(message => message.channelID === activeChannel.name);
    const username = this.props.user.username;
    const dropDownMenu = (
      <div style={{'width': '21rem', 'top': '0', alignSelf: 'baseline', padding: '0', margin: '0', order: '1'}}>
        <DropdownButton key={95} style={{'width': '21rem'}} id="user-menu"  bsSize="large" bsStyle="primary" title={username}>
          <MenuItem style={{'width': '21rem'}} eventKey="4" onSelect={::this.handleSignOut}>Sign out</MenuItem>
        </DropdownButton>
      </div>
    );
    return (
      <div style={{margin: '0', padding: '0', height: '100%', width: '100%', display: '-webkit-box'}}>
        <div className="nav">
          {dropDownMenu}
          <section style={{order: '2', marginTop: '1.5em'}}>
            <Channels onClick={::this.changeActiveChannel} channels={channels} messages={messages} actions={actions} />
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
              <MessageListItem message={message} key={message.id} />
            )}
          </ul>
          <MessageComposer activeChannel={activeChannel} user={username} onSave={::this.handleSave} />
        </div>
        <footer style={{fontSize: '0.9em', position: 'fixed', bottom: '0.2em', left: '21.5rem', color: '#000000', width: '100%', opacity: '0.5'}}>
          {typers.length === 1 &&
            <div>
              <span>
                <TypingListItem username={typers[0]} key={97}/>
                <span> is typing</span>
              </span>
            </div>}
          {typers.length === 2 &&
          <div>
            <span>
              <TypingListItem username={typers[0]} key={98}/>
              <span> and </span>
              <TypingListItem username={typers[1]} key={99}/>
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
