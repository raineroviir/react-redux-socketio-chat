import React, { Component, PropTypes } from 'react';

// warning: this module is deprecated for the time being, replaced by the Modal.
export default class ChannelComposer extends Component {

  static propTypes = {
    onSave: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      name: ''
    };
  }

  handleSubmit(event) {
    const channel = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      this.props.onSave(channel);
      this.setState({ name: '' });
    }
  }

  handleChange(event) {
    this.setState({ name: event.target.value});
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
}
