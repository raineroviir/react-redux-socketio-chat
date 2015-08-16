import React, { Component, PropTypes } from 'react';
import Footer from '../components/Footer';
import { Route, Link } from 'react-router';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';

//@ is an ES 7 decorator and connect passes the state into the App component

@connect(state => ({
  user: state.auth.user
}))

export default class App extends Component {

  render () {
    const eat = Cookies.get('eat');
    const { user, dispatch } = this.props;

    return (
      <div className="wrapper">
        <section className="top-bar">

          {eat && <button className="top-bar-button"><Link to="/chat">Chat</Link>
          </button>}

          {!eat && <button className="top-bar-button"><Link to="/login">Login</Link>
          </button> }

          {!eat && <button className="top-bar-button">
          <Link to="/register">Register</Link>
          </button> }

          {eat && <button className="top-bar-button">
          <Link to="/logout">Log Out</Link>
          </button> }

        </section>
        <section>
          {this.props.children}
        </section>
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
