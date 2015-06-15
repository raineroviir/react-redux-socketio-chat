'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  messageText: String,
  createdAt: {type: Date, default: Date.now},
  authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  read: Boolean
});

module.exports = mongoose.model('Message', messageSchema);
