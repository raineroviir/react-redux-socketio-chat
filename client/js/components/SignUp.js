import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import { Router, Navigation } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
const socket = io.connect();

@connect(state => ({
  user: state.auth.user,
  welcomePage: state.welcomePage
}))

export default class SignUp extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: this.props.welcomePage || '',
      password: '',
      confirmPassword: ''
    };
  }

  componentDidMount() {
    if(this.state.username.length) {
      React.findDOMNode(this.refs.passwordInput).focus();
    } else {
      React.findDOMNode(this.refs.usernameInput).focus();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);

    if(!this.state.username.length) {
      React.findDOMNode(this.refs.usernameInput).focus();
    }

    if(this.state.username.length && !this.state.password.length) {
      React.findDOMNode(this.refs.passwordInput).focus();
    }

    if(this.state.username.length && this.state.password.length && !this.state.confirmPassword.length) {
      React.findDOMNode(this.refs.confirmPasswordInput).focus();
    }

    if(this.state.username.length && this.state.password.length && this.state.confirmPassword.length) {
      let user = {
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      }

      const payload = {
        username: this.state.username,
        channel: 'Lobby'
      }

      const fetchData = () => {
        UserAPIUtils.addUserToChannel(payload)
        UserAPIUtils.getAllChannels(actions)
        UserAPIUtils.getAllUsersInChannel(actions)
        UserAPIUtils.getAllMessages(actions)
      }

      actions.signUp(user)
      .then(fetchData())

      this.setState({ username: '', password: '', confirmPassword: ''});
    }
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name === 'confirm-password') {
      this.setState({ confirmPassword: event.target.value });
    }
  }

  render() {
    let labelStyle = {color: 'white'};
    let buttonStyle = {background: '#23a608', width: '100%', height: '4rem', marginTop: '2rem'}
    let signUpStyle = {justifyContent: 'center', display: 'flex'}
    return (
      <div className='wrapper'>

        <header className='header'>
        Sign Up
        </header>

        <main className='main'>
          <form onSubmit={::this.handleSubmit} onChange={::this.handleChange}>
            <section>
              <label style={labelStyle}>Username</label>
              <div>
                <input ref="usernameInput" type="text" name="username" value={this.state.username} placeholder="Enter username" onChange={::this.handleChange} />
              </div>
            </section>
            <section>
              <label style={labelStyle}>Password</label>
              <div>
                <input ref="passwordInput" type="password" name="password" value={this.state.password} placeholder="Enter password" onChange={::this.handleChange} />
              </div>
            </section>
            <section>
              <label style={labelStyle}>Confirm Password</label>
              <div>
                <input ref="confirmPasswordInput" type="password" name="confirm-password" placeholder="Enter password again" value={this.state.confirmPassword} onChange={::this.handleChange} />
              </div>
            </section>
            <section style={signUpStyle}>
              <button style={buttonStyle} onClick={::this.handleSubmit} type="submit">Sign Up</button>
            </section>
          </form>
        </main>

        <aside className="aside aside-1"></aside>
        <aside className="aside aside-2"></aside>
      </div>
    );
  }
}
