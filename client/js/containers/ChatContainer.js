import React, { Component, PropTypes } from 'react';
import * as Actions from '../actions/Actions';
import Chat from '../components/Chat';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

@connect()
export default class ChatContainer extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    return (
      <Chat actions={actions} />
    );
  }
}
