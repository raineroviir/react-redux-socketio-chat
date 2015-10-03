import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class ChannelListItem extends Component {

  static propTypes = {
    channel: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired
  }

  render() {
    const { channel } = this.props;
    const { channel: selectedChannel, onShow } = this.props;
    return (
      <a className={classnames({ selected: channel === selectedChannel })}
         style={{ cursor: 'hand', color: 'white'}}
         onClick={() => onShow(channel)}>
        <li style={{cursor: 'pointer'}}>
          <h5>{channel.name}</h5>
        </li>
      </a>
    );
  }
}
