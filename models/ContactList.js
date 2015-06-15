'use strict';

var mongoose = require('mongoose');

var contactListSchema = mongoose.Schema({
  listOwnerId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  friends: Object,
  sentRequests: Object,
  receivedRequests: Object
});

module.exports = mongoose.model('ContactList', contactListSchema);
