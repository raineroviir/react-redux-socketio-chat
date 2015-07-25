import React, { Component, PropTypes } from 'react';
import Login from './Login';
import Register from './Register';

export default class UserActions extends Component {

  render() {
    return (
        <div>
          <button type="submit" value="Login" onSubmit="" />
          <button type="submit" value="Register" />
        </div>
      );
  }
}
