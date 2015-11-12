import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { Button } from 'react-bootstrap';

export default class ChannelListItem extends Component {

  static propTypes = {
    channel: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }
  render() {
    const { channel } = this.props;
    const { channel: selectedChannel, onClick } = this.props;
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
}
