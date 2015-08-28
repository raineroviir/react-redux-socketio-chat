import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import ChannelComposer from './ChannelComposer';
import ChannelListItem from './ChannelListItem';

export default class ChannelContainer extends Component {

  handleSaveChannel(channel) {
    if(channel.length !== 0) {
      this.props.actions.addChannel(channel);
    }
  }

  handleChangeChannel(channel) {
    this.props.onClick(channel);
  }

  render() {
    const { channels, actions } = this.props;
    const filteredChannels = channels;
    return (
      <section>
        <div>
          <ul className="channel-list">
            {filteredChannels.map(channel =>
              <ChannelListItem channel={channel} key={channel.id} {...actions} onShow={::this.handleChangeChannel} />
              )}
          </ul>
          <ChannelComposer onSave={::this.handleSaveChannel} />
        </div>
      </section>
    );
  }
}
