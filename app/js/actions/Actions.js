import * as types from '../constants/ActionTypes';

export function addMessage(text) {
  return {
    type: types.ADD_MESSAGE,
    text
  };

}

export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}
