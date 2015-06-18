var React = require('react');

var ChatThreadActionCreators  = require('../actions/ChatThreadActionCreators' );
var ChatMessageActionCreators = require('../actions/ChatMessageActionCreators');
var ChatWebAPIUtils           = require('../utils/ChatWebAPIUtils'            );

var ENTER_KEY_CODE = 13;

var ThreadComposer = React.createClass({

  getInitialState: function() {
    return {text: '', user: ''};
  },

  render: function() {
    return (
      <section>
        <form>
        <div>
          <label className="user">To:</label>
          <input onChange={this._onChangeUser} type="text" name="username" placeholder="type in the username" value={this.state.user}/>
        </div>
        <div>
          <label className="message">Message</label>
          <input onChange={this._onChangeText} type="text"  name="message" placeholder="type in your msg" value={this.state.text}/>
        </div>
        </form>
        <input type="submit" onClick={this._onClick}></input>
      </section>
    )
  },

  _onChangeText: function(event, value) {
    this.setState({text: event.target.value});
  },

  _onChangeUser: function(event, value) {
    this.setState({user: event.target.value});
  },

  _onClick: function(event) {
    event.preventDefault();
    var text = this.state.text.trim();
    var user = this.state.user.trim();
    var threadID = null;
    if (text && user) {
      ChatThreadActionCreators.createThread(text, threadID, user);
    }
    this.setState({text: '', user: ''});

    var friendList = ChatWebAPIUtils.getAllFriends();
    console.log('friendlist:');
    console.log(friendList);
    if (friendList) {
    friendList.forEach(function(array) {
      console.log('iterated the array');
      var text = 'Chat between you and ..'
      var threadID = null;
      var user = 'placeholder user for now'
      ChatThreadActionCreators.createThread(text, threadID, user);
    });

    ChatWebAPIUtils.getAllMessages();
    }
  }

});

module.exports = ThreadComposer;
