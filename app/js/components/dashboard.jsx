import React from 'react/addons';
var MessageList = require('./messagelist.jsx');
var Navbar = require('./nav_bar.jsx');

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
      </div>
    );
  }
};
