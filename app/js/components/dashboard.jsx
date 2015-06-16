var React = require('react');
import MessageSection from './MessageSection.jsx';
var Navbar = require('./nav_bar.jsx');

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <MessageSection />
        <Navbar />
      </div>
    );
  }
};
