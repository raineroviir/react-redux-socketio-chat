import superagent from 'superagent';
import * as Actions from '../actions/Actions';
import Cookies from 'cookies-js';

export function register(user) {
  user.email = user.username;

  return new Promise((resolve, reject) => {
    superagent
    .post('/api/sign_up')
    .send(user)
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err);
      } else {
        resolve(res.body.username);
        Cookies.set('eat', res.body.eat);
      }
    })
  });
}

export function login(user) {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/sign_in')
    .auth(user.username, user.password)
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err);
      } else {
        resolve(res.body.username)
        Cookies.set('eat', res.body.eat);
      }
    })
  })
  // .then(function(value) {
  //   console.log(value)
  //
  // }).catch(function(reason) {
  //   console.log(reason)
  // })
}

export function logout() {
  return new Promise((resolve) => {
    resolve(Cookies.set('eat', ''));
  });
}

export function createMessage(message) {

  return new Promise((resolve, reject) => {
    superagent
    .post('/api/newmessage')
    .send(message)
    .end(function(err, res) {
      if (err) {
        reject(res.body || err)
      } else {
        resolve(res.body)
      }
    })
  });
}

export function createChannel(channel) {

  return new Promise((resolve, reject) => {
    superagent
    .post('/api/channels/')
    .send(channel)
    .end(function(err, res) {
      if(err) {
        reject(res.body || err)
      } else {
        resolve(res.body)
      }
    })
  })
}

export function getAllMessages(actions) {

  return new Promise((resolve, reject) => {
    superagent
    .get('api/messages')
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err);
      } else {
        const rawMessages = res.body;
        resolve(rawMessages.forEach(function(message) {
          actions.receiveRawMessage(message)
        }))
      }
    });
  })
}

export function getAllChannels(actions) {

  return new Promise((resolve, reject) => {
    superagent
    .get('api/channels')
    .end(function(err, res) {
      if(err) {
        console.log(err);
        reject(res.body || err);
      } else {
        const rawChannels = res.body;
        resolve(rawChannels.forEach(function(channel) {
          actions.receiveRawChannel(channel)
        }))
      }
    })
  })
}

export function addUserToChannel(user) {

  return new Promise((resolve, reject) => {
    superagent
    .patch('api/channels/add_user_to_channel')
    .send(user)
    .end((err, res) => {
      if(err) {
        console.log(err);
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    })
  })
}

export function removeUserFromChannel(user) {

  return new Promise((resolve, reject) => {
    superagent
    .patch('api/channels/remove_user_from_channel')
    .send(user)
    .end((err, res) => {
      if(err) {
        console.log(err);
        reject(res.body || err)
      } else {
        console.log('successfully removed user');
        resolve(res.body)
      }
    })
  })
}

export function getAllUsersInChannel(action) {

  return new Promise((resolve, reject) => {
    superagent
    .get('api/channels/Lobby') //hard coded lobby in for now
    .end((err, res) => {
      if(err) {
        console.log(err);
        reject(res.body || err)
      } else {
        const rawUserList = res.body[0].users;
        if(rawUserList) {
          resolve(rawUserList.forEach(function(user) {
            action.addUserToChannel(user)
          }))
          }
        }
    })
  })
}
