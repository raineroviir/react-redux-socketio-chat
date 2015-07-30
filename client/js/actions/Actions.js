import * as types from '../constants/ActionTypes';
import Cookies from 'cookies-js';
import superagent from 'superagent';
import * as UserAPIUtils from '../utils/UserAPIUtils';

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

export function login(user) {
  console.log(user);
  return {
    type: types.AUTH_LOGIN_SUCCESS,
    user
  };
}

export function register(user) {
  console.log(user);
  return {
    types: [types.AUTH_REGISTER,
      types.AUTH_REGISTER_SUCCESS,
      types.AUTH_REGISTER_FAIL],
    promise: UserAPIUtils.register(user)
  }
}

export function logout() {
  Cookies.set('eat', '');
  return {
    type: types.AUTH_LOGOUT_SUCCESS
  }
}
