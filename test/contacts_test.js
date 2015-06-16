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
    var testContactList = new ContactList({listOwnerId: '557f896e8d8eec45fe3a0954', friends: {'testId1': 'test friend 1', 'testId2': 'test friend 2'}});
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
  it('Should create a test contact list beforeEach test', function (done) {
    expect(this.testContactList.listOwnerId.toString()).to.eql('557f896e8d8eec45fe3a0954');
    expect(this.testContactList.friends.testId1).to.eql('test friend 1');
    expect(Object.keys(this.testContactList.friends).length).to.eql(2);
    done();
  });

  // test get request
  it('should display users contacts on GET request', function (done) {
    chai.request('localhost:3000')
    .get('/api/contacts/557f896e8d8eec45fe3a0954')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(typeof(res.body)).to.eql('object');
      done();
    })
  });

  it('should add a new contact on POST request', function (done) {
    chai.request('localhost:3000')
    .post('/api/contacts/557f896e8d8eec45fe3a0954')
    .send({_id: 'testId3', friend: {'testId3': 'test friend 3'}})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('contact added');
      done();
    });
  });

  it('should delete a contact on DELETE request' , function (done) {
    chai.request('localhost:3000')
    .del('/api/contacts/557f896e8d8eec45fe3a0954')
    .send({_id: 'testId1'})
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.body.msg).to.eql('contact removed');
      done();
    })
  })

})
