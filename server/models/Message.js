'use strict';

var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  id: String,
  friendID: Number,
  text: String,
  user: String,
  time: String
});

module.exports = mongoose.model('Message', messageSchema);
