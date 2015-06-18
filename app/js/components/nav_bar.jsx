import React from 'react/addons';

export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="main-nav" role="navigation">
        <ul className="menu">
          <li><a href="#"><button className="nav-button">Home</button></a></li>
          <li><a href="#"><button className="nav-button">User</button></a></li>
        </ul>
        <section className="search">
          <input type="search" placeholder="Enter Search" />
          <button type="submit">Search</button>
        </section>
      </nav>
    );
  }
}
