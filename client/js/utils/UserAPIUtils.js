import superagent from 'superagent';

export function loadAuth() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/load_auth_into_state')
    .end((err, res) => {
      if (err) {
        Promise.reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
}
export function signUp(user) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/sign_up')
    .send(user)
    .end((err, res) => {
      if (err) {
        Promise.reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
}
export function signIn(user) {
  return new Promise((resolve, reject) => {
    superagent
    .post('/api/sign_in')
    .send(user)
    .end((err, res) => {
      if (err) {
        Promise.reject(err);
      } else {
        resolve(res.body);
      }
    });
  });
}
export function signOut() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/signout')
    .end((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}
export function usernameValidationList() {
  return new Promise((resolve, reject) => {
    superagent
    .get('/api/allusers')
    .end((err, res) => {
      if (err) {
        reject(res.body || err);
      } else {
        const rawUsers = res.body;
        resolve(rawUsers);
      }
    });
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
