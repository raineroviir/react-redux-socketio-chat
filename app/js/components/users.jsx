'use strict';

var React           = require('react'           );
var Fluxxor         = require('fluxxor'         );
var UsersForm       = require('./users_form.jsx');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Users = React.createClass({
  mixins: [FluxMixin],
  handleLogout: function(e) {
    e.preventDefault();

    this.getFlux().actions.logout();
  },

  render: function() {
    var users;
    if (this.props.eat)
      users = <a href onClick={this.handleLogout}>Log Out</a>;
    else
      users = <UsersForm />;
    return (
      <section>
        {users}
      </section>
    )
  }
});

module.exports = Users;
