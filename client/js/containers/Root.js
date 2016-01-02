import React, { Component, PropTypes } from 'react';
import { Redirect, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import SignIn from '../components/SignIn';
import ChatContainer from './ChatContainer';
import SignUp from '../components/SignUp';
import WelcomePage from '../components/WelcomePage';
import configureStore from '../store/configureStore';
import DevTools from './DevTools';

const store = configureStore();

export default class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  }
  render() {
    const { history } = this.props;
    return (
      <div className="root">
        <Provider store={store} >
          <div>
            <Router history={history}>
              <Redirect from="/_=_" to="/chat" />
              <Route path="/" component={WelcomePage} />
              <Route path="/chat" component={ChatContainer} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Router>
            {process.env.NODE_ENV !== 'production' && <DevTools />}
          </div>
        </Provider>
      </div>
    );
  }
}
