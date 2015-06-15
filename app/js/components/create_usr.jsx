'use strict';

var React = require('react');

module.export = React.createClass({
  render: function() {
    return (
      <h1>Please enter your details to register</h1>

      <form>
        <input type="text" value="" name="email" placeholder="Please enter your email here"/>
        <input type="text" value="" name="username" placeholder="Please enter desired username"/>
        <input type="password" name="password" placeholder="Please enter your password here"/>
        <input class="button" type="submit" value="Sign up"/>
      </form>
    )
  }
});
