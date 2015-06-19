var React       = require('react/addons'                   );
var request     = require('superagent'                     );
var Fluxxor     = require('fluxxor'                        );
var dashboard   = require('./js/components/dashboard.jsx'  );
var create_user = require('./js/components/create_user.jsx');
var log_in      = require('./js/components/log_in.jsx'     );
var Users       = require('./js/components/users.jsx'      );
var constants   = require('./js/constants/login_constants' );
var UserStore   = require('./js/stores/user_stores'        );
var Cookies = require('cookies-js');
import Router, { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

require("./css/chatapp.css");

window.React = React;

var actions = {
  login: function(user) {
    this.dispatch(constants.LOGIN, user);
  },

  logout: function() {
    this.dispatch(constants.LOGOUT);
  },

  createUser: function(user) {
    this.dispatch(constants.CREATE_USER, user);
  },
};

var stores = {
  UserStore: new UserStore()
};

var flux = new Fluxxor.Flux(stores, actions);

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('UserStore')],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return {
      userData: flux.store('UserStore').getState(),
      loggedin: ''
    };
  },
  requireAuth: function() {
    return this.state.loggedin;
  },
  render: function() {
    return (
      <main>
      <h1>WADDUP TURTLE</h1>
        <Users loggedin={this.state.userData.loggedin} eat={this.state.userData.eat}/>
      <RouteHandler/>
      </main>
    )
  }
});

// Declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route path="/dashboard" handler={dashboard} onEnter={App.requireAuth}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root flux={flux}/>, document.body);
});
