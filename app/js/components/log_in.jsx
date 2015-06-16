import React from 'react/addons';
import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService';

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = { user: '', password: '' };
  }

  login(e) {
    e.preventDefault();
    Auth.login(this.state.user, this.state.password)
      .catch(function(err) {
        alert('There was an error logging in');
        console.log('Error when trying to login: ' + err);
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" valueLink={this.linkState('user')} placeholder="Please enter your username"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" valueLink={this.linkState('password')} placeholder="Please enter your password"/>
          </div>
        <button type="submit" onClick={this.login.bind(this)}>Log in</button>
        </form>
      </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
