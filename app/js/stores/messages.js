import { ADD_MESSAGE, FIRST_FILTER} from '../constants/ActionTypes';
import { SHOW_ALL } from '../constants/ActionTypes';

const initialState = [{
  text: 'Use Redux',
  id: 0,
  threadID: 0
}];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      return [{
        text: action.text,
        id: (state.length === 0) ? 0 : state[0].id + 1,
        threadID: (state.length === 0) ? 0 : state[0].id + 1
      }, ...state];

    default:
      return state;
  }
}
