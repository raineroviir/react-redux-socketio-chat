import superagent from 'superagent';
import * as Actions from '../actions/Actions';
import Cookies from 'cookies-js';

export function loadAuth() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/refresh_token')
    .end(function(err, res) {
      if (err) {
        reject(res.body || err)
      } else {
        resolve(res.body.user);
      }
    })
  })
}


export function checkPassword(user) {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/sign_in')
    .auth(user.username, user.password)
    .end(function(err, res) {
      if (err) {
        return reject(res.body || err);
      } else {
        const user = {
          name: res.body.username
        }
        resolve(user)
        Cookies.set('eat', res.body.eat);
      }
    })
  })

}


export function signUp(user) {
  user.email = user.username;

  return new Promise((resolve, reject) => {
    superagent
    .post('/api/sign_up')
    .send(user)
    .end(function(err, res) {
      if (err) {
        console.log(err);
        return Promise.reject(res.body || err);
      } else {
        resolve(res.body.username);
        Cookies.set('eat', res.body.eat);
      }
    })
  });
}

export function signIn(user) {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/sign_in')
    .auth(user.username, user.password)
    .end(function(err, res) {
      if (err) {
        return Promise.reject(res.body || err);
      } else {
        const user = {
          name: res.body.username
        }
        resolve(user)
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

// export function signIn(user) {
//   return new Promise(function(resolve, reject) {
//     superagent
//     .get('api/sign_in')
//     .auth(user.username, user.password)
//     .end(function(err, res) {
//       if(err) {
//         return err
//       } else {
//         return res
//       }
//     })
//   });
// }

export function signOut() {
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
  console.log(channel);
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/channels/new_channel')
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

export function loadInitialMessages() {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/messages')
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err);
      } else {
        const rawMessages = res.body;
        resolve(rawMessages)
      }
    });
  })
}

export function loadInitialChannels() {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/channels')
    .end(function(err, res) {
      if(err) {
        console.log(err);
        reject(res.body || err);
      } else {
        const rawChannels = res.body;
        resolve(rawChannels)
      }
    })
  })
}

export function userIsOnline(user) {
  console.log(user);
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/userlist/user_is_online')
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

export function userIsOffline(user) {

  return new Promise((resolve, reject) => {
    superagent
    .del('/api/userlist/user_is_offline/' + user)
    // .send(user)
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

export function loadUsersOnline() {

  return new Promise((resolve, reject) => {
    superagent
    .get('/api/userlist')
    .end((err, res) => {
      if(err) {
        console.log(err);
        reject(res.body || err)
      } else {
        const rawUserList = res.body;
        resolve(rawUserList);
      }
    })
  })
}
