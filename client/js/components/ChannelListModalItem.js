import React, { PropTypes } from 'react';
import classnames from 'classnames';

let ChannelListModalItem = (props) => {
  const { channel } = props;
  const { channel: selectedChannel, onClick } = props;
  return (
    <a className={classnames({ selected: channel === selectedChannel })}
       style={{ cursor: 'hand', color: 'black'}}
       onClick={() => onClick(channel)}>
      <li style={{cursor: 'pointer'}}>
        <h5>{channel.name}</h5>
      </li>
    </a>
  );
}

ChannelListModalItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ChannelListModalItem;