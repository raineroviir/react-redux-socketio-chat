import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import { connect } from 'react-redux';
import { Button, Input } from 'react-bootstrap';

@connect()
export default class SignIn extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: '',
      password: ''
    };
  }

  componentDidMount() {
    this.refs.usernameInput.getInputDOMNode().focus();
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
    const { dispatch } = this.props;
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }

    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }

    if (this.state.username.length > 0 && this.state.password.length > 0) {
      var userpass = {
        username: this.state.username,
        password: this.state.password
      };

      const payload = {
        username: this.state.username,
        id: Date.now()
      };
      // Event chain that progresses the user towards sign-in.  Since I'm using a promise middleware all of these actions are resolved through promises.  Currently I'm actually unsure if this is the right way to go about chaining together promises and the right use case for them here.

      dispatch(Actions.signIn(userpass))
      .then(() => {
        dispatch(Actions.loadInitialMessages());
      })
      .then(() => {
        dispatch(Actions.loadInitialChannels());
      })
      .then(() => {
        dispatch(Actions.loadUsersOnline());
      })
      .then(() => {
        dispatch(Actions.userIsOnline(payload));
      })
      .then(() => {
        this.context.router.transitionTo('/chat');
      })
      this.setState({ username: '', password: ''});
    }
  }

  render() {
    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'center', background: '#000000', color: '#FFFFFF', flexGrow: '0', order: '0'}}>
          Sign In to Chat
        </header>
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <form onSubmit={::this.handleSubmit}>
            <Input
              label="Username"
              ref="usernameInput"
              type="text"
              name="username"
              placeholder="Enter username"
              value={this.state.username}
              onChange={::this.handleChange}
            />
            <Input
              label="Password"
              ref="passwordInput"
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={::this.handleChange}
            />
            <Button
              bsStyle="success"
              style={{width: '100%', height: '4rem', marginTop: '2rem'}} name="submitButton"
              type="submit" >
                <p style={{color: 'white', margin: '0', padding: '0', fontSize: '1.5em'}} >Sign In</p>
            </Button>
          </form>
        </main>
      </div>
    );
  }
}
