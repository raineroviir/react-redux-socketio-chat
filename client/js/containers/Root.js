import React, { PropTypes } from 'react';
import { Redirect, Router, Route, Link } from 'react-router';
import { provide, Provider } from 'react-redux';
import * as reducers from '../reducers';
import Login from '../components/Login';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import logger from '../middleware/logger';
import ChatContainer from './ChatContainer';
import Register from '../components/Register';
import App from '../components/App';
import Logout from '../components/Logout';
import Cookies from 'cookies-js';
import thunk from 'redux-thunk';
import promiseMiddleware from '../middleware/promiseMiddleware';

const createStoreWithMiddleware = applyMiddleware( promiseMiddleware)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);
// const redux = function(client, data) {
//   const middleware = thunkMiddleware(getState);
//   let createEverything;
//   createEverything = applyMiddleware(middleware)(createStore);
//   return createEverything(reducer);
// }

// function createEverything = compose(createStore, getState => [ thunkMiddleware(getState), loggerMiddleware ],
// );
//
// const store = createEverything(reducer);
//   compose(stores,
//   ),
//   getState => [ thunkMiddleware(getState), loggerMiddleware ]
//
// const redux = createRedux(dispatcher);

export default class Root extends React.Component {

  // static propTypes = {
  //   history: PropTypes.object.isRequired
  // }

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
        <Route path="/chat" component={ChatContainer} onEnter={requireAuth} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/logout" component={Logout} />
      </Route>
    </Router>
  )
}
