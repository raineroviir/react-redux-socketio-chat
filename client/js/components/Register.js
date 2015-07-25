import React, { Component, PropTypes } from 'react';

export default class Register extends Component {
  render() {
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
              <label>Confirm Password
                <input type="text" name="confirm password" />
              </label>
            </section>
            <section>
              <input type="submit" value="Register" />
            </section>
          </form>
        </div>
      );
  }
}
