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

export default class WelcomePage extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.usernameInput).focus();
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
  }

  handleSubmit(event) {
    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    const username = this.state.username;
    actions.welcomePage(username);
    this.setState({ username: '' });
  }
  render () {
    const eat = Cookies.get('eat');
    const { user } = this.props;

    let welcomePageStyle = {height: '20rem', display: 'flex'}
    return (
      <div className="welcome-page-wrapper">
        <header style={{display: 'flex', justifyContent: 'center'}} className='header'>
          <div className='title'>React-Redux-Socket.io-Chat</div>
        </header>

        <form className='main' style={welcomePageStyle}>

        <aside className="aside aside-1"></aside>

        <div className='sign-up-textfield'>
          <input style={{height: '4.5rem', fontSize: '1.25em'}} ref="usernameInput" type="text" name="username"
          value={this.state.username} placeholder="Enter username" onChange={::this.handleChange}/>
        </div>

        <Link className='sign-up' to="/signup">
          <button className='sign-up-button' type="submit" onClick={::this.handleSubmit}>
            <p style={{margin: '0', padding: '0', fontSize:'1.5em'}} >Sign Up</p>
          </button>
        </Link>


        <aside  className="aside aside-2"></aside>

        </form>

        <section className='sign-in'>
          <div>Already Signed Up?</div>
          <Link to="/signin">
            <button className='sign-in-button'>Sign in</button>
          </Link>
        </section>


        <section>
          {this.props.children}
        </section>
        <footer className='footer'>
        </footer>
      </div>
    )
  }
}

export default class WelcomePageContainer {
  render() {
    const { user, dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (<WelcomePage user={user} {...actions} >
      {this.props.children}
      </WelcomePage>
    )
  }

}

          //
          // {eat && <button className="top-bar-button"><Link to="/chat">Chat</Link>
          // </button>}
          //
          // {!eat && <button className="top-bar-button"><Link to="/login">Login</Link>
          // </button> }
          //
          // {!eat && <button className="top-bar-button">
          // <Link to="/register">Register</Link>
          // </button> }
          //
          // {eat && <button className="top-bar-button">
          // <Link to="/logout">Log Out</Link>
          // </button> }
