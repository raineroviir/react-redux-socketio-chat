import React from 'react/addons';
import dashboard from './js/components/dashboard.jsx';
import create_user from './js/components/create_user.jsx';
import log_in from './js/components/log_in.jsx';
import Router, { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
require("./css/chatapp.css");

window.React = React;

var App = React.createClass({
  render() {
    return (
      <div>
        <h1>TURTLE</h1>
          <ul>
          <li>
            <Link to="/log_in">Login</Link>
          </li>
          <li>
            <Link to="/create_user">Create User</Link>
          </li>
          </ul>
        <RouteHandler/>
      </div>
    )
  }
});

// declare our routes and their hierarchy
var routes = (
  <Route handler={App}>
    <Route path="/log_in" handler={log_in}/>
    <Route path="/create_user" handler={create_user}/>
    <Route path="/dashboard" handler={dashboard}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root />, document.body);
});
