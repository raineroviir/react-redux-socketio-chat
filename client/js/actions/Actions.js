import * as types from '../constants/ActionTypes';
import * as ChatWebAPIUtils from '../utils/ChatWebAPIUtils';
var socket = io();

export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    id: message.id,
    friendID: message.friendID,
    text: message.text
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    id: message.id,
    friendID: message.friendID,
    text: message.text
  }
}

export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}

export function activateFriend(friendID) {
  return {
    type: types.ACTIVATE_FRIEND,
    friendID
  }
}
