import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MessageAndChannelContainer from '../components/MessageAndChannelContainer';
import * as Actions from '../actions/Actions';

@connect(state => ({
  messages: state.messages,
  channels: state.channels,
  activeChannel: state.activeChannel,
  user: state.auth
}))

export default class ChatContainer {
  render() {
    const { messages, channels, activeChannel, dispatch, user} = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <MessageAndChannelContainer {...this.props} actions={actions} />
    );
  }
}
