import React from 'react';
import MainContainer from '../components/MainContainer';

import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { Connector } from 'redux/react';
// import superagent from 'superagent';
var socket = io();
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

    // socket.on('new bc message', function(msg) {
    //   actions.receiveRawMessage(msg);
    //   console.log('event listened and received message');
    // });
    // function messageReceive(msg) {
    //   actions.receiveRawMessage(msg);
    // }
    // (function getStateFromServer() {
    //   superagent
    //   .get('api/messages')
    //   .end(function(err, res) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     var rawMessages = res.body;
    //     rawMessages.forEach(function(message) {
    //       actions.receiveRawMessage(message);
    //     });
    //   });
    // }());

    return (
      <div>
        <MainContainer messages={messages} activeFriend={activeFriend} friends={friends} actions={actions}
         />
      </div>
    );
  }
}


