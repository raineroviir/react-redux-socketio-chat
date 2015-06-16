var React = require('react');
import MessageSection from './MessageSection.jsx';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <MessageSection />
      </div>
    );
  }
};
