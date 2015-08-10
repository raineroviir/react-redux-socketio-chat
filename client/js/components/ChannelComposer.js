import React, { Component, PropTypes } from 'react';

export default class ChannelComposer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || ''
    };
  }

  render() {
    return (
      <textarea
        className="channel-composer"
        name="channel"
        autoFocus="true"
        placeholder="Add a new channel"
        value={this.state.name}
        onChange={::this.handleChange}
        onKeyDown={::this.handleSubmit}
      />
    );
  }

  handleSubmit(event) {
    const channel = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      this.props.onSave(channel);
      this.setState({ name: '' })
    };
  }

  handleChange(event) {
    this.setState({ name: event.target.value});
  }
}
