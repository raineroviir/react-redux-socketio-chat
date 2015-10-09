import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import SignIn from '../components/SignIn';
import ChatContainer from './ChatContainer';
import SignUp from '../components/SignUp';
import WelcomePage from '../components/WelcomePage';
import Cookies from 'cookies-js';
import configureStore from '../store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
const store = configureStore();

const socket = io();
import { isLoaded } from '../reducers/auth';
import * as Actions from '../actions/Actions';
import * as UserAPIUtils from '../utils/UserAPIUtils';


function requireAuth(nextState, transition) {
  if (!Cookies.get('eat')) {
    transition.to('/signin', null, { nextPathname: nextState.location.pathname });
  }
}

export default class Root extends Component {

  componentWillMount() {
    this.fetchData(store)
  }

  fetchData(store) {
    if(!isLoaded(store.getState())) {
      // const payload = {
      //   username: this.state.username,
      //   id: Date.now()
      // };
      store.dispatch(Actions.load())
      .then(() => {
        store.dispatch(Actions.loadInitialMessages());
      })
      .then(() => {
        store.dispatch(Actions.loadInitialChannels());
      })
      .then(() => {
        store.dispatch(Actions.loadUsersOnline());
      })
      // .then(() => {
      //   store.dispatch(Actions.userIsOnline({username: 'lol'}));
      // });
    }
  }

  componentDidMount() {
    socket.on('disconnect bc', username => {
      console.log('user disconnected from componentWillUnMount');
      store.dispatch(Actions.userIsOffline(username));
      UserAPIUtils.userIsOffline(username);
    });
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  }

  render() {
    const processENV = process.env.NODE_ENV;
    const { history } = this.props;
    return (
      <div className="root">
        <Provider store={store} >
          <Router history={history}>
            <Redirect from="/" to="/welcome" />
            <Route path="/welcome" component={WelcomePage} />
            <Route path="/chat" component={ChatContainer} onEnter={requireAuth} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Router>
        </Provider>
        {processENV === 'development' && <DebugPanel top right bottom >
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>}
      </div>
    );
  }
}
