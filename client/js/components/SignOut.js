import React from 'react';
import * as Actions from '../actions/Actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserAPIUtils from '../utils/UserAPIUtils'
const socket = io();

@connect(state => ({
  user: state.auth.user
}))
export default class SignOut extends React.Component{

  componentWillMount() {
    const { dispatch, user } = this.props;
    const actions = bindActionCreators(Actions, dispatch);
    console.log(user);
    const payload = {
      username: user,
      channel: 'Lobby'
    }
    if(user) {
      socket.emit('logout');
      actions.stopTyping(user);
      actions.removeUserFromChannel(user)
      UserAPIUtils.removeUserFromChannel(payload)
    }
    actions.signOut();
  }
  render () {
    return (
      <div>
        Signed out!
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
