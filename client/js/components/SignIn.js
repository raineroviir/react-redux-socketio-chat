import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const socket = io.connect();

@connect(state => ({
  user: state.auth.user
}))

export default class SignIn extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    React.findDOMNode(this.refs.usernameInput).focus();
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
    if (event.target.name === 'password') {
      this.setState({ password: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    if(this.state.username.length < 1) {
      React.findDOMNode(this.refs.usernameInput).focus()
    }

    if(this.state.username.length > 0 && this.state.password.length < 1) {
      React.findDOMNode(this.refs.passwordInput).focus();
    }

    if(this.state.username.length > 0 && this.state.password.length > 0) {
      var userpass = {
        username: this.state.username,
        password: this.state.password
      }

      const payload = {
        username: this.state.username,
        channel: 'Lobby'
      }

      //exactly the same way we do it in the SignUp component, we hydrate the state with data fetched from the DB
      const fetchData = () => {
        UserAPIUtils.addUserToChannel(payload)
        UserAPIUtils.getAllChannels(actions)
        UserAPIUtils.getAllUsersInChannel(actions)
        UserAPIUtils.getAllMessages(actions)
      }

      actions.signIn(userpass)
      .then(fetchData())

      this.setState({ username: '', password: ''});
    }
  }

  render() {
    let labelStyle = {color: 'white'};
    let buttonStyle = {background: '#23a608', width: '100%', height: '4rem', marginTop: '2rem'}
    let signInStyle = {justifyContent: 'center', display: 'flex'}
    return (
      <div className='wrapper'>
        <header className='header'>
          Sign In to Chat
        </header>
        <main className='main'>
          <form onSubmit={::this.handleSubmit}>
            <section>
              <label style={labelStyle}>Username</label>
                <div>
                  <input ref="usernameInput" type="text" name="username" placeholder='Enter username' value={this.state.username} onChange={::this.handleChange}/>
                </div>
            </section>
            <section>
              <label style={labelStyle}>Password</label>
                <div>
                  <input ref="passwordInput" type="password" name="password" placeholder='Enter password' value={this.state.password} onChange={::this.handleChange}/>
                </div>
            </section>
            <section style={signInStyle}>
              <button style={buttonStyle} name="submitButton" type="submit" >Sign in</button>
            </section>
          </form>
        </main>
        <aside className="aside aside-1"></aside>
        <aside className="aside aside-2"></aside>
      </div>
    );
  }
}
