import * as types from '../constants/ActionTypes';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';

export function addMessage(text, friendID, id) {
  // console.log(text);
  // console.log(friendID);
  return {
    type: types.ADD_MESSAGE,
    id: id,
    friendID: friendID,
    text: text
  };
}

//hidden testing passing objects
// export function receiveRawMessage(text, friendID, id) {
//   // console.log(text);
//   // console.log(friendID);
//   return {
//     type: types.RECEIVE_MESSAGE,
//     text: text,
//     id: id,
//     friendID: friendID
//   }
// }

export function receiveRawMessage(obj) {
  // console.log(text);
  // console.log(friendID);
  console.log(obj);
  return {
    type: types.RECEIVE_MESSAGE,
    id: obj.id,
    friendID: obj.friendID,
    text: obj.text
  }
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
