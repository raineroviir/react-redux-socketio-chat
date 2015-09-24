import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import SignIn from '../components/SignIn';
import ChatContainer from './ChatContainer';
import SignUp from '../components/SignUp';
import WelcomePage from '../components/WelcomePage';
import SignOut from '../components/SignOut';
import Cookies from 'cookies-js';
import configureStore from '../store/configureStore';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
const store = configureStore();
 
function requireAuth(nextState, transition) {
  if (!Cookies.get('eat')) {
    transition.to('/signin', null, { nextPathname: nextState.location.pathname });
  }
}

export default class Root extends Component {

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
            <Route path="/signout" component={SignOut}>
              <Redirect from="/signout " to="/welcome" />
            </Route>
          </Router>
        </Provider>

        {processENV === 'development' && <DebugPanel top right bottom >
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>}

      </div>
    );
  }
}
