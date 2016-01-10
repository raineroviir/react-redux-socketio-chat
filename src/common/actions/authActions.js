import * as types from '../constants/ActionTypes';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';

function requestAuth() {
  return {
    type: types.AUTH_LOAD
  }
}

function receiveAuth(json) {
  return {
    type: types.AUTH_LOAD_SUCCESS,
    json
  }
}

export function fetchAuth() {
  return dispatch => {
    dispatch(requestAuth())
    return fetch('/api/load_auth_into_state')
      .then(response => response.json())
      .then(json => dispatch(receiveAuth(json)))
  }
}


function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
}

function receiveUser(username) {
  const newUser = {
    name: username,
    id: Symbol(username)
  }
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    newUser
  }
}

function requestSignOut() {
  return {
    type: types.AUTH_SIGNOUT
  }
}
function receiveSignOut() {
  return {
    type: types.AUTH_SIGNOUT_SUCCESS
  }
}

export function signOut() {
  return dispatch => {
    dispatch(requestSignOut())
    return fetch('/api/signout')
      .then(response => {
        if(response.status === 200 || 201) {
          dispatch(receiveSignOut())
          browserHistory.push('/')
        }
      })
      .catch(error => {throw error});
  }
}

export function signUp(user) {
  return dispatch => {
    dispatch(requestSignUp())
    return fetch('/api/sign_up', {
      method: 'post',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
      })
      .then(response => {
        if(response.status === 200 || 201) {
          dispatch(receiveUser(user.username));
          browserHistory.push('/chat');
        }
      })
      .catch(error => {throw error});
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

// function requestSignIn() {
//   return {
//     type: types.AUTH_SIGNIN
//   }
// }

// function receiveSignIn()

// export function signIn(user) {

// }

export function receiveSocket(socketID) {
  return {
    type: types.RECEIVE_SOCKET,
    socketID
  }
}
