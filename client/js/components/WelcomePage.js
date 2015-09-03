import React, { Component } from 'react';
import { Link } from 'react-router';
export default class WelcomePage extends Component {

  render () {

    return (
      //deprecated ATM
      <main className='main'>
        <div className='sign-up-textfield'>
          <input ref="usernameInput" type="text" name="username"  placeholder="Enter username" />
        </div>
        <button className='sign-up'>
          <Link to="/signup">Sign Up</Link>
        </button>

        <section className='sign-in'>
          Already Signed Up?
          <div>
            <Link to="/signin">Sign in</Link>
          </div>
        </section>

        <aside className="aside aside-1"></aside>
        <aside className="aside aside-2"></aside>

      </main>
    );
  }
}
