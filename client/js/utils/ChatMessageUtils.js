module.exports = {

  // convertRawMessage: function(rawMessage, currentThreadID) {
  //   return {
  //     id: rawMessage.id,
  //     threadID: rawMessage.threadID,
  //     authorName: rawMessage.authorName,
  //     date: new Date(rawMessage.timestamp),
  //     text: rawMessage.text,
  //     isRead: rawMessage.threadID === currentThreadID
  //   };
  // },

  getCreatedMessageData: function(text, currentThreadID) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      threadID: currentThreadID,
      authorName: 'Bill', // hard coded for the example
      date: new Date(timestamp),
      text: text,
    };
  }

};
