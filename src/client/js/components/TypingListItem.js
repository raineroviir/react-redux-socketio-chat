import React, { Component, PropTypes } from 'react';

export default class TypingListItem extends Component {

  static propTypes = {
    username: PropTypes.string.isRequired
  }

  render() {
    const  { username } = this.props;

    return (
        <span className="typing-list-item">
          {username}
        </span>
    );
  }
}
