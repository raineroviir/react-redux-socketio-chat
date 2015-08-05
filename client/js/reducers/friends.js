import { ADD_FRIEND } from '../constants/ActionTypes';

const initialState = [{
  name: 'Lobby',
  id: 0
}];

export default function friends(state = initialState, action) {
  switch(action.type) {
    case ADD_FRIEND:
      return [{
        name: action.name,
        id: (state.length === 0) ? 0 : state[0].id + 1
      }, ...state];

    default:
      return state;
  }
}
