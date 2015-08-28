import React from 'react';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

@connect(state => ({
  user: state.auth.user
}))
export default class Logout extends React.Component{

  componentWillMount() {
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    console.log(user);
    actions.stopTyping(user);
    actions.removeUserFromChannel(user)
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

//
// export default class LogoutContainer {
//
//   componentWillMount() {
//     const { user } = this.props;
//     console.log(user);
//     console.log('^from CWM logoutcontainer^')
//   }
//   render() {
//     const { dispatch, user } = this.props;
//     console.log(user);
//     console.log('^render from logoutcontainer^')
//     const actions = bindActionCreators(Actions, dispatch);
//     return(
//       <Logout actions={actions} user={user}/>
//     )
//   }
// }
