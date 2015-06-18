'use strict';
var chai      = require('chai');
var chaihttp  = require('chai-http');
var expect    = chai.expect;
var mongoose  = require('mongoose');
var User      = require('../models/User.js');
var theToken  = {};
var adminUser = {username: 'rainbow', email: 'rainbow@example.com', password: 'foobar123'};

chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');

describe('Users', function() {
  before(function(done) {   // Make a new, regular user in db
    chai.request('localhost:3000')
      .post('/api/users/')
      .send({username: 'unicorn', email: 'unicorn@example.com', password: 'foobar'})
      .end(function(err, res) {
        expect(err).to.eq(null);
        User.findOne({username: 'unicorn'}, function(err, user) { // verify added
          expect(err).to.eq(null);
          done();
        });
      });
  });

  describe('POST /api/users', function() {
    describe('WITHOUT existing user', function() {
      describe('with VALID inputs', function() {
        it('returns a success message',  function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
            .send({username: "firstEntry", email: "initial@gmail.com", password: "foobar1"})
            .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(true);
              expect(res.body.usernamePass).to.eql(true);
              expect(res.body.emailPass).to.eql(true);
              done();
            });
        });
      });
    });

    // existing user from above post request
    // should probably use a before block
    describe("WITH an existing user", function() {
      describe("with INVALID input", function() {
        it("returns a fail JSON object due to duplicate username", function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
             .send({username: 'unicorn', email: 'unicorns@example.com', password: 'foobar'})
             .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(false);
              expect(res.body.usernamePass).to.eql(false);
              done();
            });
        });

        it("returns fail a JSON object due to duplicate email", function(done) {
          chai.request("localhost:3000")
            .post("/api/users")
             .send({username: 'unicorns', email: 'unicorn@example.com', password: 'foobar'})
             .end(function(err, res) {
              expect(err).to.eql(null);
              expect(res.body.success).to.eql(false);
              expect(res.body.emailPass).to.eql(false);
              done();
            });
        });
      });
    });
  });
});
