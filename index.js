import "./client/css/chatapp.css";
import React from 'react';
import Root from './client/js/containers/Root';
import { Router, Route, Link, Navigation } from 'react-router';
import HashHistory from 'react-router/lib/HashHistory';
import BrowserHistory from 'react-router/lib/BrowserHistory';

const history = new HashHistory();

React.render(
  <Root history={history} />,
  document.getElementById('react')
)
