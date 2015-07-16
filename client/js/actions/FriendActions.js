import * as types from '../constants/ActionTypes';

export function addFriend(friend) {
  return {
    type: types.ADD_FRIEND,
    friend
  };
}
