import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io('', { path: '/api/chat' });

class ChatContainer extends Component {
  componentWillMount() {
    const { dispatch, user } = this.props;
    dispatch(Actions.fetchMessages());
    dispatch(Actions.fetchChannels(user.username));
  }
  render() {
    const actions = bindActionCreators(Actions, this.props.dispatch);
    return (
      <Chat {...this.props} actions={actions} socket={socket} />
    );
  }
}
ChatContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  channels: PropTypes.array.isRequired,
  activeChannel: PropTypes.string.isRequired,
  typers: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return {
      messages: state.messages.data,
      channels: state.channels.data,
      activeChannel: state.activeChannel.name,
      user: state.auth.user,
      typers: state.typers
  }
}
export default connect(mapStateToProps)(ChatContainer)
