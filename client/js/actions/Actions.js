import * as types from '../constants/ActionTypes';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';

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
