'use strict';

var React = require('react');

var create_user = require('./js/components/create_user.jsx');
var log_in = require('./js/components/log_in.jsx');
var WelcomePage = require('./js/components/welcome_page.jsx');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var About = React.createClass({
  render: function () {
    return <h2>About</h2>;
  }
});

var Inbox = React.createClass({
  render: function () {
    return <h2>Inbox</h2>;
  }
});

var Home = React.createClass({
  render: function () {
    return <h2>Home</h2>;
  }
});

var App = React.createClass({
  render () {
    return (
      <div>
        <h1>App</h1>
        <RouteHandler/>
      </div>
    )
  }
});



// declare our routes and their hierarchy

var routes = (
  <Route handler={App}>
    <Route path="about" handler={About}/>
    <Route path="inbox" handler={Inbox}/>
  </Route>
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

// function render () {
//   var route = window.location.hash.substr(1);
//   React.render(<App route={route} />, document.body);
// }

// window.addEventListener('hashchange', render);
// render(); // render initially

