import React, { PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { Provider } from 'redux/react';
import * as stores from '../stores';
import ChatApp from './ChatApp';
import Login from '../components/Login';
import MainContainer from '../components/MainContainer';
import { createDispatcher, createRedux, composeStores } from 'redux';
import { loggerMiddleware, thunkMiddleware } from '../middleware';

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), loggerMiddleware ]
)
const redux = createRedux(dispatcher);

export default class Root extends React.Component {

  // static propTypes = {
  //   history: PropTypes.object.isRequired
  // }

  render() {
    const { history } = this.props
    return (
      <Provider redux={redux}>
        {renderRoutes.bind(null, history)}
      </Provider>
    );
  }
}
// {() => <ChatApp />}
function renderRoutes (history) {
  return (
    <Router history={history}>
      <Route path="/" component={ChatApp}>
        <Route path="/login" component={Login}/>
        <Route path="/test" component={MainContainer}/>
      </Route>
    </Router>
  )
}
