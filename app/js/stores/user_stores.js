'use strict';

var Fluxxor = require('fluxxor');
var constants = require('../constants/login_constants');
var Cookies = require('cookies-js');
var request = require('superagent');

var UserStore = Fluxxor.createStore({
  initialize: function() {
    this.eat = Cookies.get('eat') || '';

    this.bindActions(
      constants.LOGIN, this.onLogin,
      constants.LOGOUT, this.onLogout,
      constants.CREATE_USER, this.onCreateUser
    );
  },

  onCreateUser: function(user) {
    user.email = user.username;
    request
      .post('/api/users')
      .send(user)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.eat = res.body.eat;
        Cookies.set('eat', this.eat);
        this.emit('change');
      }.bind(this));
  },

  onLogin: function(user) {
    request
      .get('/api/log_in')
      .auth(user.username, user.password)
      .end(function(err, res) {
        if (err) return console.log(err);

        this.eat = res.body.eat;
        this.username = res.body.username;
        Cookies.set('username', this.username);
        Cookies.set('eat', this.eat);
        this.emit('change');
        this.state.loggedin = true;
        console.log(this.state.loggedin)
      }.bind(this));
  },

  onLogout: function() {
    Cookies.set('eat', '');
    Cookies.set('username', '');
    this.eat = '';
    this.username = '';
    this.emit('change');
    this.state.loggedin = false;
  },

  getState: function() {
    return {
      eat: this.eat,
      username: this.username,
      loggedin: ''
    };
  }
});

module.exports = UserStore;
