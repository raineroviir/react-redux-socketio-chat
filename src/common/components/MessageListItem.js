import React, { PropTypes } from 'react';

const MessageListItem = (props) => {
  const { message } = props;
  return (
    <li>
      <span>
        <b style={{color: '#66c'}}>{message.user} </b>
        <i style={{color: '#aad', opacity: '0.8'}}>{message.time}</i>
      </span>
      <div style={{clear: 'both', paddingTop: '0.1em', marginTop: '-1px', paddingBottom: '0.3em'}}>{message.text}</div>
    </li>
  );
}

MessageListItem.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageListItem;
