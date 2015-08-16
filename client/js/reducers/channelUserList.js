import { ADD_USER_TO_CHANNEL } from '../constants/ActionTypes';

const initialState = [{
  username: 'rainer101',
  id: 0
},
{
  username: 'artful',
  id: 1
}];

export default function channelUserList(state = initialState, action) {
  switch(action.type) {
    case ADD_USER_TO_CHANNEL:
      if(state.filter(user =>
        user.username === action.user
      ).length !== 0) {
        return state
      } else {
      return [...state, {
        username: action.user,
        id: (state.length === 0) ? 0 : state[state.length - 1].id + 1
      }];
      }
    default:
      return state;
  }
}
