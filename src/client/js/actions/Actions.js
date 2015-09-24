import * as types from '../constants/ActionTypes';
import * as UserAPIUtils from '../utils/UserAPIUtils';

export function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

export function receiveRawChannel(channel) {
  return {
    type: types.RECEIVE_CHANNEL,
    channel
  };
}

export function addChannel(channel) {
  return {
    type: types.ADD_CHANNEL,
    channel
  };
}

export function userIsOnline(user) {
  return {
    types: [types.ADD_USER_TO_CHANNEL, types.ADD_USER_TO_CHANNEL_SUCCESS, types.ADD_USER_TO_CHANNEL_FAIL],
    promise: UserAPIUtils.userIsOnline(user),
    user
  };
}

export function userIsOffline(user) {
  return {
    type: types.REMOVE_USER_FROM_CHANNEL,
    user
  };
}

export function socketIOAddUser(user) {
  return {
    type: types.SOCKET_IO_ADD,
    user
  };
}

export function addUserToChannel(user) {
  return {
    type: types.ADD_USER_TO_CHANNEL,
    user
  };
}

// export function removeUserFromChannel(user) {
//   return {
//     type: types.REMOVE_USER_FROM_CHANNEL,
//     user
//   }
// }

export function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel
  };
}

export function load() {
  return {
    types: [types.AUTH_LOAD, types.AUTH_LOAD_SUCCESS, types.AUTH_LOAD_FAIL],
    promise: UserAPIUtils.loadAuth()
  };
}

export function signIn(user) {
  return {
    types: [types.AUTH_SIGNIN,
      types.AUTH_SIGNIN_SUCCESS,
      types.AUTH_SIGNIN_FAIL],
    promise: UserAPIUtils.signIn(user)
  };
}

export function signUp(user) {
  return {
    types: [types.AUTH_SIGNUP,
      types.AUTH_SIGNUP_SUCCESS,
      types.AUTH_SIGNUP_FAIL],
    promise: UserAPIUtils.signUp(user),
    user
  };
}

export function signOut() {
  return {
    types: [types.AUTH_SIGNOUT,
      types.AUTH_SIGNOUT_SUCCESS,
      types.AUTH_SIGNOUT_FAIL],
    promise: UserAPIUtils.signOut()
  };
}

export function typing(username) {
  return {
    type: types.TYPING,
    username
  };
}

export function stopTyping(username) {
  return {
    type: types.STOP_TYPING,
    username
  };
}

export function welcomePage(username) {
  return {
    type: types.SAVE_USERNAME,
    username
  };
}

export function loadInitialMessages() {
  return {
    types: [types.LOAD_MESSAGES, types.LOAD_MESSAGES_SUCCESS, types.LOAD_MESSAGES_FAIL],
    promise: UserAPIUtils.loadInitialMessages()
  };
}

export function loadInitialChannels() {
  return {
    types: [types.LOAD_CHANNELS, types.LOAD_CHANNELS_SUCCESS, types.LOAD_CHANNELS_FAIL],
    promise: UserAPIUtils.loadInitialChannels()
  };
}

export function loadUsersOnline() {
  return {
    types: [types.LOAD_USERSONLINE, types.LOAD_USERSONLINE_SUCCESS, types.LOAD_USERSONLINE_FAIL],
    promise: UserAPIUtils.loadUsersOnline()
  };
}
