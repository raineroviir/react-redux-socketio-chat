var TurtleDispatcher          = require('../dispatcher/TurtleDispatcher.js');
var {LOGIN_USER, LOGOUT_USER} = require('../constants/login_constants'     );
var RouterContainer           = require('../services/router_container.js'  );
var eat                       = require('eat'                              );

export default {
  loginUser: function(eat) {
    var savedEat = localStorage.getItem('eat');
    console.log('user logged in');

    if(savedEat !== eat) {
      console.log('eat token good, redirect to /dashboard');
      var nextPath = '/dashboard';

      RouterContainer.get().transitionTo(nextPath);
      localStorage.setItem('eat', eat);
    }

    TurtleDispatcher.dispatch({
      actionType: LOGIN_USER,
      eat: eat
    });
  },

  logoutUser: function(eat) {
    RouterContainer.get().transitionTo('/#/log_in');
    localStorage.removeItem('eat');
    TurtleDispatcher.dispatch({
      actionType: LOGOUT_USER
    });
  }
}
