import * as types from '../constants/ActionTypes';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

// NOTE:Chat actions

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

export function changeChannel(channel) {
  return {
    type: types.CHANGE_CHANNEL,
    channel
  };
}

// NOTE:Auth actions

export function loadAuth() {
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
    promise: UserAPIUtils.signUp(user)
  };
}

export function signOut(user) {
  return {
    types: [types.AUTH_SIGNOUT,
      types.AUTH_SIGNOUT_SUCCESS,
      types.AUTH_SIGNOUT_FAIL],
    promise: UserAPIUtils.signOut(user)
  };
}

// NOTE:Data Fetching actions

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

export function usernameValidationList() {
  return {
    types: [types.LOAD_USERVALIDATION, types.LOAD_USERVALIDATION_SUCCESS, types.LOAD_USERVALIDATION_FAIL],
    promise: UserAPIUtils.usernameValidationList()
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES
  }
}

export function fetchMessages() {
  return dispatch => {
    dispatch(requestMessages())
    return fetch('/api/messages')
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json)))
  }
}

function receiveMessages(json) {
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json
  }
}

function shouldFetchMessages(state) {
  const messages = state.messages.data;
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState())) {
      return dispatch(fetchMessages())
    }
  }
}
