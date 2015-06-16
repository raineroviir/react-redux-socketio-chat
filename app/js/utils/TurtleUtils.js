module.exports = {

  convertRawMessage: function(rawMessage) {
    return {
      id: rawMessage.id,
      text: rawMessage.text,
    };
  },

  getCreatedMessageData: function(text) {
    var timestamp = Date.now();
    return {
      id: 'm_' + timestamp,
      text: text
    };
  }
};
