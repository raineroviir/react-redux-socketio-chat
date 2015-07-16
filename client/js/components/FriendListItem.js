import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

export default class FriendListItem extends Component {

  render() {
    const friend = this.props.friend;
    const { friend: selectedFriend, onShow } = this.props;
    return (
      <a className={classnames({ selected: friend === selectedFriend })}
         style={{ cursor: 'hand'}}
         onClick={() => onShow(friend)}>
        <li className="friend-list-item">
          <h5 className="friend-name">{friend.name}</h5>
        </li>
      </a>
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
