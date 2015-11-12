import { SAVE_USERNAME } from '../constants/ActionTypes';

const initialState = '';
export default function typing(state = initialState, action) {
  switch (action.type) {

  case SAVE_USERNAME:
    return action.username;
  default:
    return state;
  }
}
