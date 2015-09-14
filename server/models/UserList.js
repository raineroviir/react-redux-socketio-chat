'use strict';

var mongoose = require('mongoose');

var userListSchema = mongoose.Schema({
  username: {type: String, unique: true},
  id: Number
});

module.exports = mongoose.model('UserList', userListSchema);
