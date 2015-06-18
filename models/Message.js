'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  id: String,
  threadID: String,
  threadName: String,
  authorName: String,
  text: String,
  timestamp: {type: Date, default: Date.now()},
  users: Array
});

module.exports = mongoose.model('Message', messageSchema);
