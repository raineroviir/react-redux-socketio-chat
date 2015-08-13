import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import { Router, Navigation } from 'react-router';
import { connect } from 'react-redux';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
const socket = io.connect();

@connect(state => ({
  user: state.auth.user
}))

export default class Register extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit(event) {

    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    event.preventDefault();

    var user = {
      username: this.state.username,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    actions.register(user);
    socket.emit('add user', user.username);
    UserAPIUtils.getAllMessages(actions);
    this.setState({ username: '', password: '', confirmPassword: ''});
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
    const { user, dispatch } = this.props;
    var submitButton = <button onClick={::this.handleSubmit} type="submit">Register</button>

    return (
        <div>
          <form onSubmit={::this.handleSubmit} onChange={::this.handleChange}>
            <section>
              <label>Username
                <input type="text" name="username" value={this.state.username} onChange={::this.handleChange} />
              </label>
            </section>
            <section>
              <label>Password
                <input type="password" name="password" value={this.state.password} onChange={::this.handleChange} />
              </label>
            </section>
            <section>
              <label>Confirm Password
                <input type="password" name="confirm-password" value={this.state.confirmPassword} onChange={::this.handleChange} />
              </label>
            </section>
            <section>
              {submitButton}
            </section>
          </form>
        </div>
      );
  }
}
