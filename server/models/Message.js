'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  id: String,
  friendID: Number,
  // users: Array,
  // threadName: String,
  // authorName: String,
  text: String
  // timestamp: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('Message', messageSchema);
