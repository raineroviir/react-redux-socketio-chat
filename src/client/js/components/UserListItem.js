import React, { Component, PropTypes } from 'react';

export default class UserListItem extends Component {

  static propTypes = {
    user: PropTypes.string.isRequired
  }

  render() {
    const  { user } = this.props;

    // stashed for when I want to use online color indicators:

    // const openDot = (
    //     <span className="glyphicon glyphicon-one-fine-empty-dot"></span>
    // );
    //
    // const greenDot = (
    //     <span className="glyphicon   glyphicon-one-fine-green-dot"></span>
    // );

    return (
        <li>
          <h5>{user}</h5>
        </li>
    );
  }
}
