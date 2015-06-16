'use strict';

var chai     = require('chai');
var chaihttp = require('chai-http');
var expect   = chai.expect;
var mongoose = require('mongoose');
var User     = require('../models/User.js');
chai.use(chaihttp);

// Use test db
process.env.MONGOLAB_URI = 'mongodb://localhost/skribbl_test';

// Start api server for testing
require('../server.js');


describe('Authentication', function() {
  // var currentUser;
  describe('GET /login', function() {
    before(function(done) {   // Make a new user in db
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
	
    after(function(done) {
			User.remove({}, function(err, data){
				done();	
			});
      mongoose.connection.db.dropDatabase(function(){ done(); });
    });

    describe('with VALID info', function() {
      var responseBody;
      before(function(done) {
        chai.request('localhost:3000')  // make call to login user
          .get('/api/login')
          .auth('unicorn@example.com', 'foobar')
          .end(function(err, res) {
            expect(err).to.eq(null);
            responseBody = res.body;
            done();
          });
      });

      it('returns success:true', function(done) {
        expect(responseBody.success).to.eq(true);
        done();
      });
      it('returns an EAT auth token', function(done) {
        expect(typeof responseBody.eat).to.eq('string');
        done();
      });
    });

    describe('with INVALID PASSWORD', function() {
      var responseBody;
      before(function(done) {
        chai.request('localhost:3000')
          .get('/api/login')
          .auth('unicorn@example.com', 'wrongpassword')
          .end(function(err, res) {
            expect(err).to.eq(null);
            responseBody = res.body;
            done();
          });
      });
      after(function(done) {
        mongoose.connection.db.dropDatabase(function(){ done(); });
      });
      it('returns empty {} object', function(done) {
        expect(responseBody).to.eql({});
        done();
      });
      it('does NOT return an EAT auth token', function(done) {
        expect(responseBody.eat).to.eq(undefined);
        done();
      });
    });

    describe('with INVALID EMAIL', function() {
      var responseBody;
      before(function(done) {
        chai.request('localhost:3000')
          .get('/api/login')
          .auth('vampire@example.com', 'foobar')
          .end(function(err, res) {
            expect(err).to.eq(null);
            responseBody = res.body;
            done();
          });
      });
      after(function(done) {
				User.remove({}, function(err, data){
					if (err) console.log('could not remove users');
					done();
				});
      });

      it('returns empty {} object', function(done) {
        expect(responseBody).to.eql({});
        done();
      });
      it('does NOT return an EAT auth token', function(done) {
        expect(responseBody.eat).to.eq(undefined);
        done();
      });
    });
  });
});

