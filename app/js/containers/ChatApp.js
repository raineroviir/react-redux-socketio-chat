import React from 'react';
import MainContainer from '../components/MainContainer';
import FriendContainer from '../components/FriendContainer';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';

export default class ChatApp {

  render() {
    return (
      <Connector select={state => ({ messages: state.messages, friends: state.friends })}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ messages, friends, dispatch }) {
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <div>
        <MainContainer messages={messages} friends={friends} actions={actions}
         />
        <FriendContainer friends={friends} actions={actions} />
      </div>
    );
  }
}


