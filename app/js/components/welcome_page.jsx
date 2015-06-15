'use strict';

var React = require('react');

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

module.export = WelcomePage;
