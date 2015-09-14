'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  users: Array,
  id: String
});

module.exports = mongoose.model('Channel', channelSchema);
