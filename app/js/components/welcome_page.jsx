'use strict';

var React = require('react');
var Router = require('react-router');
var createUsr = require('./create_usr.jsx');
var login = require('./login.jsx');

var WelcomePage = React.createClass({
  render: function() {
    return (
      <main>
        <button className="placeholder create user" onClick="placeholder" >Create User</button>
        <button className="placeholder login" onClick="placeholder">Log In</button>
        <Link to="login">Login</Link>
        <RouteHandler/>
      </main>
    )
  }
});

module.exports = WelcomePage;
