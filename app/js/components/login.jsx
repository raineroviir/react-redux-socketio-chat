'use strict';

var React = require('react');

module.export = React.createClass({
  render: function() {
    return (
      <h1>Welcome to Turtle</h1>

      <form>
        <input type="text" value="" name="username" placeholder="Please enter your username"/>
        <input type="password" name="password" placeholder="Please enter your password"/>
        <input class="button" type="submit" value="Sign in"/>
      </form>
    )
  }
});
