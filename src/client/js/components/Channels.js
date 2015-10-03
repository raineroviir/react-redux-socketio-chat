import React, { Component, PropTypes } from 'react';
import ChannelListItem from './ChannelListItem';
import { Modal, Glyphicon } from 'react-bootstrap';
const socket = io();
import * as UserAPIUtils from '../utils/UserAPIUtils';
import classnames from 'classnames';

export default class Channels extends Component {

  static propTypes = {
    channels: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      addChannelModal: false,
      channelName: '',
      moreChannelsModal: false
    };
  }

  handleChangeChannel(channel) {
    this.props.onClick(channel);
  }

  openAddChannelModal() {
    event.preventDefault();
    this.setState({addChannelModal: true});
  }

  closeAddChannelModal() {
    event.preventDefault();
    this.setState({addChannelModal: false});
  }

  handleModalChange(event) {
    this.setState({channelName: event.target.value});
  }

  handleModalSubmit(event) {
    event.preventDefault();

    if (this.state.channelName.length < 1) {
      this.refs.channelName.focus();
    }
    if (this.state.channelName.length) {
      const newChannel = {
        name: this.state.channelName.trim(),
        id: Date.now()
      };

      UserAPIUtils.createChannel(newChannel);
      this.props.actions.addChannel(newChannel);
      socket.emit('new channel', newChannel);
      this.setState({channelName: ''});
      this.closeAddChannelModal();
    }
  }

  openMoreChannelsModal() {
    event.preventDefault()
    this.setState({moreChannelsModal: true});
  }

  closeMoreChannelsModal() {
    event.preventDefault()
    this.setState({moreChannelsModal: false});
  }

  render() {
    const { channels, actions } = this.props;
    const filteredChannels = channels.slice(0,8);
    const moreChannelsBoolean = channels.length > 8;
    const restOfTheChannels = channels.slice(8);
    const glyphStyle = {'background': 'Transparent', 'backgroundRepeat': 'noRepeat', 'border': 'none', 'cursor': 'pointer', 'overflow': 'hidden', 'outline': 'none'};

    const newChannelModal = (
      <div>
        <Modal key={1} show={this.state.addChannelModal} onHide={::this.closeAddChannelModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Channel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={::this.handleModalSubmit}>
            <input
              name="channelName"
              autoFocus="true"
              placeholder="Enter the channel name"
              value={this.state.channelName}
              onChange={::this.handleModalChange}
              onSubmit={::this.handleModalSubmit}
            />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={::this.closeAddChannelModal}>Cancel</button>
            <button onSubmit={::this.handleModalSubmit} type="submit">
              Create Channel
            </button>
          </Modal.Footer>
          </Modal>
      </div>
    );

    const moreChannelsModal = (
      <div style={{background: 'grey'}}>
        <Modal key={2} show={this.state.moreChannelsModal} onHide={::this.closeMoreChannelsModal}>
          <Modal.Header closeButton>
            <Modal.Title>All the Channels</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul style={{height: 'auto', margin: '0', overflowY: 'auto', padding: '0'}}>
              {restOfTheChannels.map(channel =>
                <ChannelListModalItem channel={channel} key={channel.id} {...actions} onShow={::this.handleChangeChannel} />
                )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={::this.closeMoreChannelsModal}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    )

    return (
      <section>
        <div>
          <strong style={{'marginRight': '10rem'}}>Channels</strong>
          <button onClick={::this.openAddChannelModal} style={glyphStyle}>
            <Glyphicon glyph="plus" />
          </button>
        </div>
          {newChannelModal}
        <div>
          <ul style={{height: 'auto', margin: '0', overflowY: 'auto', padding: '0'}}>
            {filteredChannels.map(channel =>
              <ChannelListItem channel={channel} key={channel.id} {...actions} onShow={::this.handleChangeChannel} />
              )}
          </ul>

          {moreChannelsBoolean && <a onClick={::this.openMoreChannelsModal} style={{'cursor': 'pointer', 'color': '#85BBE9'}}> + {channels.length} more...</a>}
          {moreChannelsModal}
          <a onClick={::this.openAddChannelModal} style={{'cursor': 'pointer', 'color': '#85BBE9'}}>
            Create a channel
          </a>
        </div>
      </section>
    );
  }
}

class ChannelListModalItem extends Component {

  static propTypes = {
    channel: PropTypes.object.isRequired,
    onShow: PropTypes.func.isRequired
  }

  render() {
    const { channel } = this.props;
    const { channel: selectedChannel, onShow } = this.props;
    return (
      <a className={classnames({ selected: channel === selectedChannel })}
         style={{ cursor: 'hand', color: 'black'}}
         onClick={() => onShow(channel)}>
        <li style={{cursor: 'pointer'}}>
          <h5>{channel.name}</h5>
        </li>
      </a>
    );
  }
}
