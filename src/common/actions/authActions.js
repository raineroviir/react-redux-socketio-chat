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

function requestSignUp() {
  return {
    type: types.AUTH_SIGNUP
  }
}

function receiveUser(json) {
  console.log(json);
  return {
    type: types.AUTH_SIGNUP_SUCCESS,
    json
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
