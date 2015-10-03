import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import * as Actions from '../actions/Actions';
import { connect } from 'react-redux';

// the empty connect is to pass in the dispatch function
@connect()
export default class WelcomePage extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      username: ''
    };
  }

  componentDidMount() {
    this.refs.usernameInput.focus();
  }

  handleChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    }
  }

  handleSubmit() {
    const { dispatch } = this.props;
    const username = this.state.username;
    dispatch(Actions.welcomePage(username));
    this.setState({ username: '' });
  }

  render() {
    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'center', background: '#000000', color: '#FFFFFF', flexGrow: '0', order: '0'}}>
        React-Redux-Socket.io-Chat
        </header>
        <main style={{display: 'flex', justifyContent: 'center'}}>
          <form style={{height: '20rem', display: 'flex', justifyContent: 'center'}}>
            <div style={{margin: 'auto'}}>
              <input style={{height: '4.5rem', fontSize: '1.25em'}}
              ref="usernameInput"
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Enter username"
              onChange={::this.handleChange}/>
            </div>
            <Link style={{background: '#23a608', color: 'white', margin: 'auto', width: '12em', height: '3.5em'}} to="/signup">
              <button style={{background: '#23a608', color: 'white', margin: 'auto', width: '12em', height: '3.5em'}} type="submit" onClick={::this.handleSubmit}>
                <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>Sign Up</p>
              </button>
            </Link>
          </form>
        </main>
        <section style={{display: 'flex', justifyContent: 'center'}}>
          <div>Already Signed Up?</div>
          <Link to="/signin">
            <button style={{margin: 'auto'}}>Sign in</button>
          </Link>
        </section>
      </div>
    );
  }
}
