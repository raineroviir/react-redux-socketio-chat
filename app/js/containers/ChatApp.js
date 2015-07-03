import React from 'react';
import MainContainer from '../components/MainContainer';

import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';

export default class ChatApp {

  render() {
    return (
      <Connector select={state => ({ messages: state.messages, friends: state.friends, activeFriend: state.activeFriend })}>
        {this.renderChild}
      </Connector>
    );
  }

  renderChild({ messages, friends, activeFriend, dispatch }) {
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <div>
        <MainContainer messages={messages} activeFriend={activeFriend} friends={friends} actions={actions}
         />
      </div>
    );
  }
}


