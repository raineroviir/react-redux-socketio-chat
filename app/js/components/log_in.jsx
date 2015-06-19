'use strict';

var React           = require('react'  );
var Fluxxor         = require('fluxxor');

var FluxMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Login = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {user: {username: '', password: ''}};
  },
  handleChange: function(event) {
    var stateCopy = this.state;
    stateCopy.changed = true;
    if (event.target.name === 'user-username')
      stateCopy.user.username = event.target.value;
    if (event.target.name === 'user-password')
      stateCopy.user.password = event.target.value;

    this.setState(stateCopy);
  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.login(this.state.user);
  },
  render: function() {
    var usernameError;
    var passwordError;
    var submitButton;
    if (this.state.user.username.length < 1 && this.state.changed)
      usernameError = <span>user name cannot be blank</span>;
    if (this.state.user.password.length < 1 && this.state.changed)
      passwordError = <span>password cannot be blank</span>;
    if (usernameError || passwordError && !this.state.changed)
      submitButton = <button type="submit" disabled>Log In</button>;
    else
      submitButton = <button type="submit" >Log In</button>;

    return (
      <section  className="sign-in">
        <form name="signinform" onSubmit={this.handleSubmit}>
          <ul className="sign-in-form">
            <li><label htmlFor="username">User Name:</label>{usernameError}</li>
            <li><input type="text" name="user-username" id="username" placeholder="User Name Required" value={this.state.user.username} onChange={this.handleChange} /></li>
            <li><label htmlFor="password">Password:</label>{passwordError}</li>
            <li><input type="password" name="user-password" id="password" placeholder="Password Required" value={this.state.user.password} onChange={this.handleChange} /></li>
            <li>{submitButton}</li>
          </ul>
        </form>
      </section>
    )
  }
});

module.exports = Login;
