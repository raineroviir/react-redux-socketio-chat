import React from 'react/addons';
var MessageList = require('./messagelist.jsx');

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <MessageList />
      </div>
    );
  }
};
