import React, { Component, PropTypes } from 'react';

export default class UserListItem extends Component {

  render() {
    const  { user } = this.props;
    const openDot = (
        <span className="glyphicon glyphicon-one-fine-empty-dot"></span>
    );

    const greenDot = (
        <span className="glyphicon   glyphicon-one-fine-green-dot"></span>
    );

    return (
        <li className="user-list-item" style={{'display':'-webkit-box'}}>
          {user.username}
        </li>
    );
  }
}
