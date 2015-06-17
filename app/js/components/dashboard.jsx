import React from 'react/addons';
import MessageSection from './MessageSection.jsx';
import Navbar from './nav_bar.jsx';
import ThreadSection from './ThreadSection.jsx';
import ChatExampleData from './ChatExampleData';
import ChatWebAPIUtils from '../utils/ChatWebAPIUtils';

var Navbar = require('./nav_bar.jsx');
ChatExampleData.init();
ChatWebAPIUtils.getAllMessages()

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <MessageSection />
        <ThreadSection />
      </div>
    );
  }
};
