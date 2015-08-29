import { TYPING, STOP_TYPING} from '../constants/ActionTypes';

//module deactivated&*&*&*&*
const initialState = [{
  username: 'rainer',
  typing: true
  }];
export default function typing(state = initialState, action) {
  switch(action.type) {
    case TYPING:
    if(!state[action.username]) {
      return [...state, {
        username: action.username,
        typing: true
      }];
    } else {
      return state.map(item => item.username === action.username ?
        {...item, typing: true } :
        item
      );
    }
    case STOP_TYPING:
      return state.map(item =>
        item.username === action.username ?
          { ...item, typing: false } :
          item
        );

    default:
      return state;
  }
}
