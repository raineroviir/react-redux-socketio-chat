'use strict';

var React = require('react');
var createUsr = require('./create_usr.jsx');
var login = require('./login.jsx');

var WelcomePage = React.createClass({
  render: function() {
    return (
      <main>
        <button className="placeholder create user" onClick="placeholder" >Create User</button>
        <button className="placeholder login" onClick="placeholder">Log In</button>
      </main>
    )
  }
});

module.exports = WelcomePage;
