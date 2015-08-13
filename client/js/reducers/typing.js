import { TYPING, STOP_TYPING} from '../constants/ActionTypes';

const initialState = [{
  username: 'rainer',
  typing: true
  }];
export default function typing(state = initialState, action) {
  switch(action.type) {
    case TYPING:
    console.log(state);
    console.log('typing reducer hit');
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
      console.log(state);
      console.log('stop typing reducer hit');
      return state.map(item =>
        item.username === action.username ?
          { ...item, typing: false } :
          item
        );

    default:
      return state;
  }
}
