'use strict';
var chai      = require('chai');
var chaihttp  = require('chai-http');
var expect    = chai.expect;
var mongoose  = require('mongoose');
var Message   = require('../models/Message');
var eat       = require('eat');
var User      = require('../models/User');
var testToken = '';
var testMessage;

chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');

describe('test message routes', function () {

  before(function (done) {
    testMessage = new Message({id: 'tmpId', users: [], threadName: 'thread name', authorName: 'test author name', text: 'some text', timestamp: Date.now()});
    testMessage.save(function (err, data) {
      if (err) {
        throw err;
      }
      testMessage = data;
      done();
    });
    var testUser = new User({id: 'tmpId', users: [], threadName: 'thread name', authorName: 'test author name', text: 'some text', timestamp: Date.now(), role: 'regularUser', suspended: false, username: 'test username', groups: 'groups', basic: { email: 'test@example.com', password: '123'}, threads: []});

      testUser.basic.password = testUser.generateHash(testUser.basic.password, function (err, hash) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'internal server error'});
        }
        testUser.basic.password = hash;
      });

      testUser.save(function (err, user) {
        if (err) {
          console.log(err);
          return res.status(500).json({msg: 'could not create new user'});
        }

        testUser.generateToken(process.env.APP_SECRET, function (err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({msg: 'errror generating token'});
          }
          testToken = token;
        });
          console.log('AAAAAAAAA', testToken);
      });
  });


  after(function(done) {
    mongoose.connection.db.dropDatabase(function () {
      done();
    });
  });

  it('Should have status 200', function (done) {
    chai.request('localhost:3000')
    .get('/')
    .end(function (err, res) {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      done();
    });
  });

  it('should make a test thread before tests', function () {
    expect(testMessage.id).to.eql('tmpId');
    expect(testMessage.threadName).to.eql('thread name');
    expect(testMessage.authorName).to.eql('test author name');
    expect(testMessage.text).to.eql('some text');
    });

  // it('should respond to get request with arrray of messages', function (done) {
  //   chai.request('localhost:3000')
  //   .get('/api/dashboard')
  //   .send({eat: testToken})
  //   .end(function (err, res) {
  //   console.log(res.body);
  //     expect(err).to.eql(null);
  //     expect(Array.isArray(res.body)).to.eql(true);
  //     done();
  //   })
  // })

  it('Should respond to POST request by creating a new message', function (done) {
      chai.request('localhost:3000')
      .post('/api/messages/createmessage')
      .set('eat', testToken)
      .send({id: 'newId', users: [], threadName: 'thread name', authorName: 'test author name', text: 'some text', eat: testToken})
      .end(function (err, res) {
        // console.log(res.body);
        expect(err).to.eql(null);
        expect(typeof res.body).to.eql('Object');
        expect(res.body.threadName).to.eql('thread name');
        expect(res.body.authorName).to.eql('test author name');
        expect(res.body.text).to.eql('some text');
        expect(res.body).to.have.property('_id');
        done();
      })
    })

});

