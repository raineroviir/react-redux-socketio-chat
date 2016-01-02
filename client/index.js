import './css/chatapp.css';
import React from 'react';
import Root from './js/containers/Root';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

ReactDOM.render(
  <Root history={browserHistory} />,
  document.getElementById('react')
);
