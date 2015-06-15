'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  messageText: String,
  messageSentTime: {type: Date, default: Date.now},
  authorId: Number,
  read: boolean
});

module.exports = mongoose.model('Message', messageSchema);
