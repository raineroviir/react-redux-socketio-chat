import React, { PropTypes } from 'react';
import classnames from 'classnames';

export default class ChannelListModalItem extends React.Component {

  static propTypes = {
    channel: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }
  render() {
    const { channel } = this.props;
    const { channel: selectedChannel, onClick } = this.props;
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
}
