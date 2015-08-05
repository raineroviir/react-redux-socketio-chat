import React from 'react';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.auth.user
}))

export default class Logout extends React.Component{

  componentDidMount() {
    const { dispatch } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    actions.logout();
  }

  render () {
    return (
      <div>
        Logged out!
      </div>
    )
  }
}
