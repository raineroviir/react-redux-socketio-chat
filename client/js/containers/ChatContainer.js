import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MainContainer from '../components/MainContainer';
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
    console.log(user);
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <MainContainer {...this.props} actions={actions} />
    );
  }
}
