'use strict';

var React = require('react');
var WelcomePage = require('./js/components/welcome_page.jsx');
var createUsr = require('./js/components/create_usr.jsx');
var login = require('./js/components/login.jsx');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

window.React = React; //react dev tools

var routes = (
  <Route handler={WelcomePage}>
    <Route name="welcomepage" path="/" handler={WelcomePage} />
    <Route name="login" path="/login" handler={login} />
  </Route>
)


Router.run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById('react'));
});
