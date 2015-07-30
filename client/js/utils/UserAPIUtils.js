import superagent from 'superagent';
import * as Actions from '../actions/Actions';
import Cookies from 'cookies-js';

export function register(user) {
  console.log('hit the UserAPIUtils <register>');
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
          resolve(res.body);
          Cookies.set('eat', res.body.eat);
        }
    })
  });
}

export function login(user) {
  console.log('hit the UserAPIUtils <login>');

  superagent
  .get('/api/log_in')
  .auth(user.username, user.password)
  .end(function(err, res) {
    if (err) return console.log(err);

    Cookies.set('eat', res.body.eat);
  })
}
