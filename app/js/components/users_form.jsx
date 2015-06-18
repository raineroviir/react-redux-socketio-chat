'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var CreateUser = require('./create_user.jsx');
var Login = require('./log_in.jsx');

var UsersForm = React.createClass({
  mixins: [FluxMixin],
  getInitialState: function() {
    return {existingUser: false};
  },
  toggleExisting: function(e) {
    e.preventDefault();
    var existing = this.state.existingUser;
    console.log(this.state);
    this.setState({existingUser: !existing});
  },
  render: function() {
    var userForm;
    var linkText;
    var h1Text;
    var users;

    if (!this.state.existingUser) {
      linkText = 'Create New User'
      userForm = <Login />
    } else {
      linkText = 'Log in to Exisiting User'
      h1Text = 'Creating New User';
      userForm = <CreateUser />
    }

    return (
      <div className="create-or-login-button">
        <a href onClick={this.toggleExisting}>
        <button>{linkText}</button>
        </a>
        {userForm}
      </div>
    )
  }
});

module.exports = UsersForm;
