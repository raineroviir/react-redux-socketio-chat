'use strict';

var React = require('react');

module.export = React.createClass({
  render: function() {
    return (
      <form>
        <h3>Welcome to Turtle</h3>
        <input type="text" value="" name="username" placeholder="Please enter your username"/>
        <input type="password" name="password" placeholder="Please enter your password"/>
        <input class="button" type="submit" value="Sign in"/>
      </form>
    )
  }
});
