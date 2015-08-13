import React, { Component, PropTypes } from 'react';

export default class TypingListItem extends Component {

  // static propTypes = {
  //   message: PropTypes.object.isRequired
  // }

  render() {
    const  { username, typers } = this.props;

    return (
        <span className="typing-list-item">
          {username}
        </span>
    );
  }
}

// {typers.length === 1 && username && <span> is typing</span>}
// {typers.length === 2 && username}
// {typers.length > 2 && username}
