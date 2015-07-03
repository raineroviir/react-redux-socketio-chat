import { ADD_MESSAGE, FIRST_FILTER} from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/ActionTypes';
import Immutable from 'immutable'
const initialState = [{
  text: 'Use Redux',
  id: 0,
  friendID: 0
}];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
    console.log(action);
      return [{
        text: action.text,
        id: (state.length === 0) ? 0 : state[0].id + 1,
        friendID: action.friendID
      },...state];

    default:
      return state;
  }
}
