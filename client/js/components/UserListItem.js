import React, { Component, PropTypes } from 'react';

export default class UserListItem extends Component {

  render() {
    const  { user } = this.props;
    return (
        <div className="user-list-item">
          {user.username}
        </div>
    );
  }
}
