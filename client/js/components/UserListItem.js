import React, { Component, PropTypes } from 'react';

export default class UserListItem extends Component {

  render() {
    const  { user } = this.props;
    return (
        <li className="user-list-item">
          {user.username}
        </li>
    );
  }
}
