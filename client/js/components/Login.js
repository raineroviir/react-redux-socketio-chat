import React, { Component, PropTypes } from 'react';
import * as UserAPIUtils from '../utils/UserAPIUtils';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.auth.user
}))

export default class Login extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    };
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
    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    console.log('hello from handle submit')
    event.preventDefault();
    var user = {
      username: this.state.username,
      password: this.state.password
    }
    actions.login(user);
    this.setState({ username: '', password: ''});
    UserAPIUtils.getAllMessages(actions);
  }

  render() {

    return (
        <div>
          <form onSubmit={::this.handleSubmit}>
            <section>
              <label>Username
                <input type="text" name="username" value={this.state.username} onChange={::this.handleChange}/>
              </label>
            </section>
            <section>
              <label>Password
                <input type="password" name="password" value={this.state.password} onChange={::this.handleChange}/>
              </label>
            </section>
            <section>
              <input type="submit" value="Login" />
            </section>
          </form>
        </div>
      );
  }
}
