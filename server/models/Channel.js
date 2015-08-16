'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: String,
  users: Array
});

module.exports = mongoose.model('Channel', channelSchema);
