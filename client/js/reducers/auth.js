import {
  AUTH_LOAD,
  AUTH_LOAD_SUCCESS,
  AUTH_LOAD_FAIL,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAIL,
  AUTH_REGISTER_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  loaded: false,
  user: null
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
        user: action.result
      };
    case AUTH_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case AUTH_LOGIN:
      return {
        ...state,
        loggingIn: true
      };
    case AUTH_LOGIN_SUCCESS:
      console.log(action);
      return {
        loaded: 'login',
        user: 'login101'
      };
    case AUTH_LOGIN_FAIL:
        return {
          ...state,
          loggingIn: false,
          user: null,
          loginError: action.error
      };
    case AUTH_REGISTER:
      console.log('hit AUTH_REGISTER');
      console.log(action);
      return {
        ...state,
        registering: true
      };
    case AUTH_REGISTER_SUCCESS:
      console.log('hit AUTH_REGISTER_SUCCESS');
      console.log(action);
      return {
        ...state,
        user: action.result
      };
    case AUTH_REGISTER_FAIL:
      console.log('hit AUTH_REGISTER_FAIL');
      console.log(action);
      return {
        ...state,
        user: action.error
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loggingOut: true
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        // loggingOut: false,
        user: null
      };
    case AUTH_LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}
