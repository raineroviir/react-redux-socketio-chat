import React, { PropTypes } from 'react';
import { Redirect, Router, Route, Link } from 'react-router';
import { provide, Provider } from 'react-redux';
import * as reducers from '../reducers';
import Login from '../components/Login';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import logger from '../middleware/logger';
import Chat from '../components/Chat';
import Register from '../components/Register';
import App from './App';
import Logout from '../components/Logout';
import Cookies from 'cookies-js';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';

const createStoreWithMiddleware = applyMiddleware( promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class Root extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history, dispatch } = this.props
    return (
      <Provider store={store}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }
}

function requireAuth(nextState, transition) {
  if(!Cookies.get('eat')) {
    transition.to('/login', null, { nextPathname: nextState.location.pathname });
  }
}

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="/chat" component={Chat} onEnter={requireAuth} />
        <Route path="/login" component={Login}>
        </Route>
        <Route path="/register" component={Register}>
        </Route>
        <Route path="/logout" component={Logout}>
          <Redirect from="/logout " to="/" />
        </Route>
      </Route>
    </Router>
  )
}
