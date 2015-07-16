import React, { Component, PropTypes } from 'react';

export default class FriendComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || ''
    };
  }

  render() {
    return (
      <textarea
        className="friend-composer"
        name="friend"
        autoFocus='true'
        value={this.state.name}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
      />
    );
  }

  handleSubmit(event) {
    const name = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      this.props.onSave(name);
      this.setState({ name: '' })
    };
  }

  handleChange(event) {
    this.setState({ name: event.target.value});
  }
}
