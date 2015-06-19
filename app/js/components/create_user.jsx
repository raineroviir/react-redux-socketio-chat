'use strict';

var React           = require('react'  );
var Fluxxor         = require('fluxxor');

var FluxMixin       = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CreateUser = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {newUser: {username: '', password: '', email: ''}, changed: false};
  },
  handleChange: function(event) {
    var stateCopy = this.state;
    stateCopy.changed = true;
    if (event.target.name === 'user-email')
      stateCopy.newUser.email = event.target.value;
    if (event.target.name === 'user-username')
      stateCopy.newUser.username = event.target.value;
    if (event.target.name === 'user-password')
      stateCopy.newUser.password = event.target.value;

    this.setState(stateCopy);

  },
  handleSubmit: function(event) {
    event.preventDefault();

    this.getFlux().actions.createUser(this.state.newUser);

  },
  render: function() {
    var usernameError;
    var passwordError;
    var emailError;
    var submitButton;
    if (this.state.newUser.email.length < 1 && this.state.changed)
      emailError = <span>email cannot be blank</span>;
    if (this.state.newUser.username.length < 1 && this.state.changed)
      usernameError = <span>user name cannot be blank</span>;
    if (this.state.newUser.password.length < 1 && this.state.changed)
      passwordError = <span>password cannot be blank</span>;
    if (usernameError || passwordError || !this.state.changed)
      submitButton = <button type="submit" disabled>Save New User</button>;
    else
      submitButton = <button type="submit" >Save New User</button>;

    return (
      <section  className="sign-in">
        <form name="signupform" onSubmit={this.handleSubmit}>
          <ul className="sign-in-form">
            <li><label htmlFor="email">Email:</label></li>
            <li><input type="text" name="user-email" id="email" placeholder="Email Required" value={this.state.newUser.email} onChange={this.handleChange} /></li>
            <li><label htmlFor="username">User Name:</label></li>
            <li><input type="text" name="user-username" id="username" placeholder="User Name Required" value={this.state.newUser.username} onChange={this.handleChange} /><  /li>
            <li><label htmlFor="password">Password:</label></li>
            <li><input type="password" name="user-password" id="password" placeholder="Password Required" value={this.state.newUser.password} onChange={this.handleChange} /></li>
            <li>{submitButton}</li>
          </ul>
        </form>
      </section>
    )
  }
});

module.exports = CreateUser;
