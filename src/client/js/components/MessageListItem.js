import React, { Component, PropTypes } from 'react';

export default class MessageListItem extends Component {

  static propTypes = {
    message: PropTypes.object.isRequired,
  }

  render() {
    const  { message } = this.props;

    return (
      <li className="message-list-item">
        <span>
          <b className="message-user">{message.user} </b>
          <i className="message-time">{message.time}</i>
        </span>
        <div className="message-content">{message.text}</div>
      </li>
    );
  }
}
