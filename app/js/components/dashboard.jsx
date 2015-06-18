var React           = require('react/addons'            );
var MessageSection  = require('./MessageSection.jsx'    );
var Navbar          = require('./nav_bar.jsx'           );
var ThreadSection   = require('./ThreadSection.jsx'     );
var ChatExampleData = require('./ChatExampleData'       );
var ChatWebAPIUtils = require('../utils/ChatWebAPIUtils');


ChatExampleData.init();
ChatWebAPIUtils.getAllMessages();

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
