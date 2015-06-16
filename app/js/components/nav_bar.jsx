import React from 'react/addons';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav class="main-nav" role="navigation">
        <ul class="menu">
          <li><a href="#">Home</a></li>
          <li><a href="#">User</a></li>
          <input type="search" placeholder="Enter Search" />
          <button type="submit">Search</button>
        </ul>
      </nav>
    );
  }
}
