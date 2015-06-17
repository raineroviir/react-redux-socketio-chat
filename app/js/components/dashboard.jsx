import React from 'react/addons';
import MessageSection from './MessageSection.jsx';
import Navbar from './nav_bar.jsx';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <Navbar />
        <MessageSection />
      </div>
    );
  }
};
