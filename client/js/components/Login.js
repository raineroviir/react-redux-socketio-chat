import React, { Component, PropTypes } from 'react';

export default class Login extends Component {

  render() {
    alert('you hit the login route');
    return (
        <div>
          <form>
            <section>
              <label>Username
                <input type="text" name="username" />
              </label>
            </section>
            <section>
              <label>Password
                <input type="text" name="password" />
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
