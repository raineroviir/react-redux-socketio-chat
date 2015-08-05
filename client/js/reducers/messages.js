import { ADD_MESSAGE, RECEIVE_MESSAGE, FIRST_FILTER} from '../constants/ActionTypes';

const initialState = [{
  id: 0,
  friendID: 0,
  text: 'Use Redux',
  user: 'Rainer',
  time: new Date()
}];

export default function messages(state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE:
      console.log('new message created!');
      return [{
        id: (state.length === 0 ) ? 0 : state[0].id + 1,
        friendID: action.message.friendID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      },...state];

    case RECEIVE_MESSAGE:
      console.log('message received from server or other client into state');
      return [{
        id: (state.length === 0 ) ? 0 : state[0].id + 1,
        friendID: action.message.friendID,
        text: action.message.text,
        user: action.message.user,
        time: action.message.time
      },...state];

    default:
      return state;
  }
}
