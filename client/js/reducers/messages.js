import { ADD_MESSAGE, RECEIVE_MESSAGE, FIRST_FILTER} from '../constants/ActionTypes';
import strftime from 'strftime';

const initialState = [{
  id: 0,
  channelID: 0,
  text: 'Welcome to the chat',
  user: 'Rainer',
  time: strftime('%H:%M %p', new Date())
}];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      return [...state, {
        id: (state.length === 0 ) ? 0 : state[state.length - 1].id + 1,
        channelID: action.message.channelID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      }];

    case RECEIVE_MESSAGE:
      return [...state, {
        id: (state.length === 0 ) ? 0 : state[state.length - 1].id + 1,
        channelID: action.message.channelID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      }];

    default:
      return state;
  }
}
