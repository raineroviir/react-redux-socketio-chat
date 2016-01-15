import * as types from '../constants/ActionTypes';

const initialState = '';
export default function welcomePage(state = initialState, action) {
  switch (action.type) {

  case types.SAVE_USERNAME:
    return action.username;
  case types.AUTH_SIGNOUT_SUCCESS:
    return '';
  default:
    return state;
  }
}
