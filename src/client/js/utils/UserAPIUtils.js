import superagent from 'superagent';
import Cookies from 'cookies-js';

export function loadAuth() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/refresh_token')
    .end((err, res) => {
      if (err) {
        return Promise.reject(res.body || err);
      } else {
        resolve(res.body.user);
      }
    });
  });
}

export function checkPassword(user) {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/sign_in')
    .auth(user.username, user.password)
    .end((err, res) => {
      if (err) {
        return Promise.reject(res.body || err);
      } else {
        const serverResponse = {
          name: res.body.username
        };
        resolve(serverResponse);
        Cookies.set('eat', res.body.eat);
      }
    });
  });
}

export function signUp(user) {
  user.email = user.username;
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/sign_up')
    .send(user)
    .end((err, res) => {
      if (err) {
        // return Promise.reject(res.body || err);
        return err;
      } else {
        resolve(res.body.username);
        Cookies.set('eat', res.body.eat);
      }
    });
  });
}

export function validateUsername(username) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/validate_username')
    .send(username)
    .end((err, res) => {
      if (err) {
        return err;
      } else {
        var result = res.body.valid;
        console.log(result);
        if (result) {
          resolve(result)
        } else {
          reject(result)
        }
      }
    })
  })
}

export function loadUserList() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/allusers')
    .end((err, res) => {
      if (err) {
        return reject(res.body || err);
      } else {
        const rawUsers = res.body;
        resolve(rawUsers);
      }
    })
  })
}

export function signIn(user) {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/sign_in')
    .auth(user.username, user.password)
    .end((err, res) => {
      if (err) {
        return Promise.reject(res.body || err);
      } else {
        const serverResponse = {
          name: res.body.username
        };
        resolve(serverResponse);
        Cookies.set('eat', res.body.eat);
      }
    });
  });
}

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
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function createChannel(channel) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/channels/new_channel')
    .send(channel)
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function loadInitialMessages() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/messages')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        const rawMessages = res.body;
        resolve(rawMessages);
      }
    });
  });
}

export function loadInitialChannels() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/channels')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        const rawChannels = res.body;
        resolve(rawChannels);
      }
    });
  });
}

export function userIsOnline(user) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/userlist/user_is_online')
    .send(user)
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function userIsOffline(user) {
  return new Promise((resolve, reject) => {
    superagent
    .del('/api/userlist/user_is_offline/' + user)
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        resolve(res.body);
      }
    });
  });
}

export function loadUsersOnline() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/userlist')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        const rawUserList = res.body;
        resolve(rawUserList);
      }
    });
  });
}
