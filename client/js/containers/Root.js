import React, { PropTypes } from 'react';
import { Redirect, Router, Route, Link } from 'react-router';
import { provide, Provider } from 'react-redux';
import * as reducers from '../reducers';
import SignIn from '../components/SignIn';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Chat from '../components/Chat';
import SignUp from '../components/SignUp';
import App from './App';
import SignOut from '../components/SignOut';
import Cookies from 'cookies-js';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';
import logger from 'redux-logger';
import WelcomePage from '../components/WelcomePage';

import { devTools, persistState } from 'redux-devtools';
// import persistState from 'redux-localstorage';
// import adapter from 'redux-localstorage/lib/adapters/localStorage';
// import filter from 'redux-localstorage-filter';

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { reduxRouteComponent } from 'redux-react-router';

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk, promiseMiddleware, logger),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const rootReducer = combineReducers(reducers);
const store = createStoreWithMiddleware(rootReducer);

// const storage = compose(
//   filter('key')
// )(adapter(window.localStorage));

// const createStoreWithMiddleware = compose(
//   applyMiddleware(logger),
//   // persistState(storage, 'my-storage-key')
// )(createStore);

// const createPersistentStoreWithDevTools = compose(
//   persistState(storage, 'my-storage-key'),
//   devTools(),
//   persistDevToolsState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
// )(createStore);



export default class Root extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const { history, dispatch } = this.props
    return (
      <div className='root'>
        <Provider store={store}>
          {renderRoutes.bind(null, history)}
        </Provider>

        <DebugPanel top right bottom >
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>

      </div>
    );
  }
}



function requireAuth(nextState, transition) {
  if(!Cookies.get('eat')) {
    transition.to('/signin', null, { nextPathname: nextState.location.pathname });
  }
}

function renderRoutes (history) {
  return (
    <Router history={history}>
      <Redirect from="/" to="/welcome" />
      <Route path="/welcome" component={App} />
      <Route path="/chat" component={Chat} onEnter={requireAuth} />
      <Route path="/signin" component={SignIn}>
      </Route>
      <Route path="/signup" component={SignUp}>
      </Route>
      <Route path="/signout" component={SignOut}>
        <Redirect from="/signout " to="/welcome" />
      </Route>
    </Router>
  )
}
