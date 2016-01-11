'use strict';

var mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  id: String,
  private: Boolean,
  between: Array
});

module.exports = mongoose.model('Channel', channelSchema);
