var React           = require('react/addons'            );
var MessageSection  = require('./MessageSection.jsx'    );
var Navbar          = require('./nav_bar.jsx'           );
var ThreadSection   = require('./ThreadSection.jsx'     );
var ChatExampleData = require('./ChatExampleData'       );
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');
var Cookies = require('cookies-js');

export default class Dashboard extends React.Component {
  render() {
    var dashboardSection;
    if (Cookies.get('eat')) {
      ChatExampleData.init();
      ChatWebAPIUtils.getAllMessages();
      var intervalID = window.setInterval(function() { ChatWebAPIUtils.getAllMessages() }, 3);
      dashboardSection = <div><MessageSection />
        <ThreadSection /></div>;
    } else {
      dashboardSection = <div></div>;
    }
    return (
      <div className="dashboard">
      {dashboardSection}
      </div>
    );
  }
};
