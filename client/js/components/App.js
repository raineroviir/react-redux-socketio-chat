import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';

@connect(state => ({
  user: state.auth.user
}))

export default class App extends React.Component {
  render () {
    const eat = Cookies.get('eat');
    const { user, dispatch } = this.props;
    return (
      <div>
        <ul>
          <li><Link to="/chat">Chat</Link></li>
          {!eat && <li><Link to="/login">Login</Link></li> }
          {!eat && <li><Link to="/register">Register</Link></li> }
          {eat && <li><Link to="/logout">Log Out</Link></li> }
        </ul>
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default class AppContainer {
  render() {
    const { user, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (<App user={user} {...actions} >
      {this.props.children}
      </App>
    )
  }

}
