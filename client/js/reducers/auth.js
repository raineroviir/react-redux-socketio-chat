import {
  AUTH_LOAD,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAIL,
  AUTH_SIGNIN,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNOUT,
  AUTH_SIGNOUT_SUCCESS,
  AUTH_SIGNOUT_FAIL,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAIL
} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  user: {
    username: null,
    id: null
  }
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
  case AUTH_LOAD:
    return {
      ...state,
      loading: true
    };
  case AUTH_LOAD_SUCCESS:
    return {
      ...state,
      loading: false,
      loaded: true,
      user: {
        username: action.result.facebook ?  action.result.facebook.username : action.result.local.username,
        id: action.result._id
      }
    };
  case AUTH_LOAD_FAIL:
    return {
      ...state,
      loading: false,
      loaded: false,
      error: action.error
    };
  case AUTH_SIGNIN:
    return {
      ...state,
      signingIn: true
    };
  case AUTH_SIGNIN_SUCCESS:
    return {
      ...state,
      signingIn: false,
      user: {
        username: action.result.local.username,
        id: action.result.id
      }
    };
  case AUTH_SIGNIN_FAIL:
    return {
      ...state,
      signingIn: false,
      user: null,
      signInError: action.error
    };
  case AUTH_SIGNUP:
    return {
      ...state,
      signingUp: true
    };
  case AUTH_SIGNUP_SUCCESS:
    return {
      ...state,
      signingUp: false,
      user: {
        username: action.result.local.username,
        id: action.result._id
      }
    };
  case AUTH_SIGNUP_FAIL:
    return {
      ...state,
      user: action.error
    };
  case AUTH_SIGNOUT:
    return {
      ...state,
      signingOut: true
    };
  case AUTH_SIGNOUT_SUCCESS:
    return {
      ...state,
      signingOut: false,
      user: {
        username: null,
        id: null
      }
    };
  case AUTH_SIGNOUT_FAIL:
    return {
      ...state,
      signingOut: false,
      signOutError: action.error
    };
  default:
    return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
