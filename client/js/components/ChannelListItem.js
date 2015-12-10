import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

let ChannelListItem = (props) => {
  const { channel } = props;
  const { channel: selectedChannel, onClick } = props;
  return (
    <Button bsSize="xsmall" bsStyle="primary" >
      <a className={classnames({ selected: channel === selectedChannel })}
         style={{ cursor: 'hand', color: 'white'}}
         onClick={() => onClick(channel)}>
        <li style={{textAlign: 'left', cursor: 'pointer', marginLeft: '2em'}}>
          <h5>{channel.name}</h5>
        </li>
      </a>
    </Button>
  );
}

ChannelListItem.propTypes = {
  channel: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ChannelListItem;
