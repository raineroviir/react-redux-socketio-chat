'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  users: Array
});

module.exports = mongoose.model('Channel', channelSchema);
