'use strict';

var React = require('react');

var createUsr = React.createClass({
  render: function() {
    return (
      <form>
        <h3>Please enter your details to register</h3>
        <input type="text" value="" name="email" placeholder="Please enter your email here"/>
        <input type="text" value="" name="username" placeholder="Please enter desired username"/>
        <input type="password" name="password" placeholder="Please enter your password here"/>
        <input class="button" type="submit" value="Sign up"/>
      </form>
    )
  }
});

module.exports = createUsr;
