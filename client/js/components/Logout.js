import React from 'react';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.auth.user
}))

export default class Logout extends React.Component{

  componentWillMount() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    actions.logout();
    actions.stopTyping();
  }

  render () {
    return (
      <div>
        Logged out!
      </div>
    )
  }
}
