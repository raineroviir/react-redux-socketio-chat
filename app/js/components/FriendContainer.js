import React, { Component, PropTypes } from 'react';
import { FIRST_FILTER, SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/Filters';
import classnames from 'classnames';
import FriendComposer from './FriendComposer';
import FriendListItem from './FriendListItem';

const THREAD_FILTER = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: message => message.threadID === 0,
  [SHOW_MARKED]: () => true
};

export default class FriendContainer extends Component {

  handleSaveFriend(name) {
    if(name.length !== 0) {
      this.props.actions.addFriend(name);
    }
  }

  handleShow(friend) {

  }

  render() {
    const { friends, actions } = this.props;
    const filteredFriends = friends;
    return (
      <section>
        <div className="friend-section">
          <ul className="friend-list">
            {filteredFriends.map(friend =>
              <FriendListItem friend={friend} key={friend.id} {...actions} onShow={::this.handleShow} />
              )}
          </ul>
          <FriendComposer onSave={::this.handleSaveFriend} />
        </div>
      </section>
    );
  }
}


        // <ul>
        //   {[SHOW_ALL, SHOW_UNMARKED, SHOW_MARKED].map(filter =>
        //     <li key={filter}>
        //       {this.renderFilterLink(filter)}
        //     </li>
        //   )}
        // </ul>

  // renderFilterLink(filter) {
  //   const title = FILTER_TITLES[filter];
  //   const { filter: selectedFilter, onShow } = this.props;

  //   return (
  //     <a className={classnames({ selected: filter === selectedFilter })}
  //        style={{ cursor: 'hand' }}
  //        onClick={() => onShow(filter)}>
  //       {title}
  //     </a>
  //   );
  // }
