import React from 'react';
import * as Actions from '../actions/Actions';

function logOut() {
  Actions.logout()
}

export default class Logout extends React.Component{

  render () {
    logOut()
    return (
      <div>
        Logged out!
      </div>
    )
  }
}
