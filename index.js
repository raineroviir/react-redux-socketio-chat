import React from 'react';
import App from './app/js/containers/App';
import Router, { DefaultRoute, Link, Route, RouteHandler } from 'react-router';
import request from 'superagent';
import ChatExampleData from './app/ChatExampleData';
import ChatWebAPIUtils from './app/js/utils/ChatWebAPIUtils'
require("./app/css/chatapp.css");

window.React = React; //enable debugger

ChatExampleData.init(); // load example data into localstorage

ChatWebAPIUtils.getAllMessages();

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
