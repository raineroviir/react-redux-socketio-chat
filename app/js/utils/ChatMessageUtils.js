module.exports = {

  convertRawMessage: function(rawMessage, currentThreadID, username) {
    return {
      id: rawMessage.id,
      threadID: rawMessage.threadID,
      authorName: rawMessage.authorName,
      date: new Date(rawMessage.timestamp),
      text: rawMessage.text,
      isRead: rawMessage.threadID === currentThreadID,
      username: username,
      users: username
    };
  },

  getCreatedMessageData: function(text, currentThreadID, username) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: username || 'Bill Nye',
      date: new Date(timestamp),
      text: text,
      isRead: true,
      users: username
    };
  }

};
