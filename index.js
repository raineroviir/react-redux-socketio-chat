import "./client/css/chatapp.css";
import React from 'react';
import Root from './client/js/containers/Root';
import { Router, Route, Link, Navigation } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';
import BrowserHistory from 'react-router/lib/BrowserHistory';
import Login from './client/js/components/Login';

const history = new HashHistory();

React.render(
  <Root history={history} />,
  document.getElementById('react')
)
