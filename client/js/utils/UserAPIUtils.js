import superagent from 'superagent';
import * as Actions from '../actions/Actions';
import Cookies from 'cookies-js';

export function register(user) {
  user.email = user.username;

  return new Promise((resolve, reject) => {
    superagent
    .post('/api/create_user')
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
    .get('/api/log_in')
    .auth(user.username, user.password)
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err);
      } else {
        resolve(res.body)
        Cookies.set('eat', res.body.eat);
      }
    })
  });
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

export function getAllMessages(actions) {

  return new Promise((resolve, reject) => {
    superagent
    .get('api/messages')
    .end(function(err, res) {
      if (err) {
        console.log(err);
        reject(res.body || err)
      } else {
        const rawMessages = res.body;
        resolve(rawMessages.forEach(function(message) {
          actions.receiveRawMessage(message)
        }))
      }
    });
  })
}
