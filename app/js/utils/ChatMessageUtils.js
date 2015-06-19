module.exports = {

  convertRawMessage: function(rawMessage, currentThreadID, username, sendMessageTo) {
    return {
      id: rawMessage.id,
      threadID: rawMessage.threadID,
      authorName: rawMessage.authorName,
      date: new Date(rawMessage.timestamp),
      text: rawMessage.text,
      isRead: rawMessage.threadID === currentThreadID,
      username: rawMessage.username,
      users: rawMessage.users,
      sendMessageTo: rawMessage.sendMessageTo
    };
  },

  getCreatedMessageData: function(text, currentThreadID, username, sendMessageTo, threadname) {
    // console.log('getCreatedMessageData');
    // console.log(sendMessageTo);
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: username || 'Bill Nye',
      date: new Date(timestamp),
      text: text,
      isRead: true,
      users: [username, sendMessageTo, threadname],
      sendMessageTo: sendMessageTo
    };
  },

  getFriendData: function(friends) {
    return {
      friends: friends
    }
  }

};
