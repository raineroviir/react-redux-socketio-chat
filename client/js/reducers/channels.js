import { ADD_CHANNEL } from '../constants/ActionTypes';

const initialState = [{
  name: 'Lobby',
  id: 0
}];

export default function channels(state = initialState, action) {
  switch(action.type) {
    case ADD_CHANNEL:
      return [...state, {
        name: action.channel,
        id: (state.length === 0) ? 0 : state[state.length - 1].id + 1
      }];

    default:
      return state;
  }
}
