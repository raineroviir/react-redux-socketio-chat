import React, { PropTypes } from 'react';

let TypingListItem = (props) => {
  const { username } = props;
  return (
    <span>
      {username}
    </span>
  );
}

TypingListItem.propTypes = {
  username: PropTypes.string.isRequired
}

export default TypingListItem;