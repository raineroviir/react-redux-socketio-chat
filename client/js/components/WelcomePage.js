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
    const welcomePageStyle = {height: '20rem', display: 'flex', justifyContent: 'center'};
    return (
      <div className="welcome-page-wrapper">
        <header style={{display: 'flex', justifyContent: 'center'}} className="header">
          <div className="title">React-Redux-Socket.io-Chat</div>
        </header>

        <form style={welcomePageStyle}>

        <aside className="aside aside-1"></aside>

        <div className="sign-up-textfield">
          <input style={{height: '4.5rem', fontSize: '1.25em'}} ref="usernameInput" type="text" name="username"
          value={this.state.username} placeholder="Enter username" onChange={::this.handleChange}/>
        </div>

        <Link className="sign-up" to="/signup">
          <button className="sign-up-button" type="submit" onClick={::this.handleSubmit}>
            <p style={{margin: '0', padding: '0', fontSize: '1.5em'}} >Sign Up</p>
          </button>
        </Link>


        <aside  className="aside aside-2"></aside>

        </form>

        <section className="sign-in">
          <div>Already Signed Up?</div>
          <Link to="/signin">
            <button className="sign-in-button">Sign in</button>
          </Link>
        </section>

        <footer className="footer">
        </footer>
      </div>
    );
  }
}
