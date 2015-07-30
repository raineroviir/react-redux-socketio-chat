import "./client/css/chatapp.css";
import React from 'react';
import Root from './client/js/containers/Root';
import { Router, Route, Link, Navigation } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Login from './client/js/components/Login';

const history = new HashHistory();
// <Route component={App}>
//     <Route path="/" component={MainContainer} />
//     <Route path="/login" component={Login} />
// </Route>

// React.render(
  // <Router history ={history}>
  //   <Route path="/" component={App}>
  //     <Route path="/login" component={Login}/>
  //   </Route>
  // </Router>
//   , document.getElementById('react')
// );

React.render(
  <Root history={history} />,
  document.getElementById('react')
)

// Declare our routes and their hierarchy
// var routes = (
//   <Route handler={App}>
//     <Route path="/" handler={dashboard} />
//   </Route>
// );

// Router.run(routes, Router.HashLocation, (Root) => {
//   React.render(<Root />, document.body);
// });
