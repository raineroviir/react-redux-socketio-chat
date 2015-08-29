import { ADD_CHANNEL, RECEIVE_CHANNEL } from '../constants/ActionTypes';

const initialState = [];

export default function channels(state = initialState, action) {
  switch(action.type) {
    case ADD_CHANNEL:
      if(state.filter(state => state.name === action.channel).length !== 0) {
        return state
      } else {
        return [...state, {
          name: action.channel,
          id: (state.length === 0) ? 0 : state[state.length - 1].id + 1
        }];
      }
    case RECEIVE_CHANNEL:
      if(state.filter(state => state.name === action.channel.name).length !== 0) {
        return state
      } else {
        return [...state, {
          name: action.channel.name,
          id: action.channel.id
        }];
      }
      default:
        return state;
  }
}
