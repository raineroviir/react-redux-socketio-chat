'use strict';

var mongoose = require('mongoose');

var contactListSchema = mongoose.Schema({
  listOwnerId: Number,
  friends: Array,
  sentRequests: Array,
  receivedRequests: Array
});

module.exports = mongoose.model('ContactList', contactListSchema);
