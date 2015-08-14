import React, { Component, PropTypes } from 'react';

export default class TypingListItem extends Component {

  render() {
    const  { username } = this.props;

    return (
        <span className="typing-list-item">
          {username}
        </span>
    );
  }
}
