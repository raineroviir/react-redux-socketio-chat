import * as types from '../constants/ActionTypes';

export function addMessage(text, friendID) {
  console.log(text)
  console.log(friendID)
  return {
    type: types.ADD_MESSAGE,
    text: text,
    friendID: friendID
  };

}

export function addFriend(name) {
  return {
    type: types.ADD_FRIEND,
    name
  };
}

export function activateFriend(friendID) {
  return {
    type: types.ACTIVATE_FRIEND,
    friendID
  }
}
