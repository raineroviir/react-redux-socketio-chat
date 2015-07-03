import React, { Component, PropTypes } from 'react';
import Immutable , { Record } from 'immutable';

// class MessageRecord extends Record({id: null}) {
//   getID() {
//     return this.id;
//   }

// }

export default class MessageComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }

  render() {
    return (
      <textarea
        className="message-composer"
        name="message"
        autoFocus='true'
        value={this.state.text}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
      />
    )
;  }

  handleSubmit(event) {
    // console.log(this.props);
    // console.log(this.props.activeFriend);
    // var myMsgRecord = new MessageRecord({id: this.props.activeFriend});
    // console.log(myMsgRecord);
    // console.log(this.props.friendID);
    // console.log(ImmutableFriendID);
    // console.log(ImmutableFriendID.get('id'));
    // const sentVal = ImmutableFriendID.get('id');
    // const activeFriend = this.props.activeFriend;
    // var activeFriend = myMsgRecord.getID();
    // console.log(activeFriend);
    const text = event.target.value.trim();
    // const friendID = this.props.friendID; //placeholder
    if (event.which === 13) {
      event.preventDefault();
      this.props.onSave(text, this.props.activeFriend);
      this.setState({ text: '' })
    };
  }

  handleChange(event) {
    this.setState({ text: event.target.value});
  }
}
