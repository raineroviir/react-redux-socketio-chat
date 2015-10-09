import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// @ is an ES 7 decorator and connect passes the state into the App component

@connect(state => ({
  messages: state.messages.data,
  channels: state.channels.data,
  activeChannel: state.activeChannel,
  user: state.auth.user,
  typers: state.typers,
  onlineUsers: state.onlineUsers.data
}))
export default class ChatContainer extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    user: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    activeChannel: PropTypes.object.isRequired,
    typers: PropTypes.array.isRequired,
    onlineUsers: PropTypes.array.isRequired
  }

  render() {
    const { dispatch, messages, channels, activeChannel, user, typers, onlineUsers } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <Chat actions={actions} {...this.props}/>
    );
  }
}
