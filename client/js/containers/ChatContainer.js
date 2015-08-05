import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageAndChannelContainer from '../components/MessageAndChannelContainer';
import * as Actions from '../actions/Actions';

@connect(state => ({
  messages: state.messages,
  friends: state.friends,
  activeFriend: state.activeFriend,
  user: state.auth
}))

export default class ChatContainer {
  render() {
    const { messages, friends, activeFriend, dispatch, user} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <MessageAndChannelContainer {...this.props} actions={actions} />
    );
  }
}
