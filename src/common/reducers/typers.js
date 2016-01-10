import { TYPING, STOP_TYPING} from '../constants/ActionTypes';

const initialState = [];
export default function typers(state = initialState, action) {
  switch (action.type) {

  case TYPING:
    if (state.indexOf(action.username) === - 1) {
      return [...state, action.username];
    }
    return state;
  case STOP_TYPING:
    return state.filter(user =>
      user !== action.username
    );
  default:
    return state;
  }
}

// state.filter(item => Object.keys(item)[0] === 'super')
