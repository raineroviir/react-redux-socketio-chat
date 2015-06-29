import React, { Component, PropTypes } from 'react';
import MessageComposer from './MessageComposer';
import MessageListItem from './MessageListItem';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/Filters';

const THREAD_FILTER = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: message => message.threadID === 0,
  [SHOW_MARKED]: () => true
};

export default class MainContainer extends Component {

  static propTypes = {
    messages: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = { filter: SHOW_ALL };
  }

  handleSave(text) {
    if(text.length !== 0) {
      this.props.actions.addMessage(text);
    }
  }

  handleShow(filter) {
    this.setState({ filter });
  }

  render() {
    const { messages, friends, actions } = this.props;
    const { filter } = this.state;
    console.log(friends);
    const filteredMessages = messages.filter(THREAD_FILTER[filter]);
    return (
      <main>
        <div className="message-section">
          <ul className="message-list">
            {filteredMessages.map(message =>
              <MessageListItem message={message} key={message.id} {...actions} />
            )}
          </ul>
          <MessageComposer onSave={::this.handleSave} />
        </div>
      </main>
    );
  }
}
