import React from 'react';
import App from './client/js/containers/App';
import Router, { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

require("./client/css/chatapp.css");

window.React = React; //enable debugger



React.render(
  <App />,
  document.getElementById('react')
);

// Declare our routes and their hierarchy
// var routes = (
//   <Route handler={App}>
//     <Route path="/" handler={dashboard} />
//   </Route>
// );

// Router.run(routes, Router.HashLocation, (Root) => {
//   React.render(<Root />, document.body);
// });
