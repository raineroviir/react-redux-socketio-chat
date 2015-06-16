'use strict';

process.env.MONGOLAB_URI = 'mongodb://localhost/contacts_test';
require('../server.js');

var fs = require('fs');
var bodyparser = require('body-parser');
var chai = require('chai');
var chaihttp = require('chai-http');
var expect = chai.expect;
var ContactList = require('../models/ContactList');
var mongoose = require('mongoose');

chai.use(chaihttp);

describe('Test Contact List Requests', function () {

  // create test contact list
  beforeEach(function (done) {
    var testContactList = new ContactList({listOwnerId: '557f896e8d8eec45fe3a0954', friends: {'testId': 'test friend'}});
    testContactList.save(function (err, data) {
    if (err) {
      throw err;
    }
    this.testContactList = data;
    done();
  }.bind(this))
});

  // dump test database
  after(function (done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  // test for making test contact list
  it('Should create a test contact list beforeEach test', function () {
    expect(this.testContactList.listOwnerId.toString()).to.eql('557f896e8d8eec45fe3a0954');
  });

})
