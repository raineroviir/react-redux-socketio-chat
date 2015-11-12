import './css/chatapp.css';
import React from 'react';
import Root from './js/containers/Root';
import HashHistory from 'react-router/lib/HashHistory';
import ReactDOM from 'react-dom';

const history = new HashHistory();

ReactDOM.render(
  <Root history={history} />,
  document.getElementById('react')
);
