'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// set environment var
process.env.PORT = process.env.PORT || 3000;
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev'

// connect mongoose
mongoose.connect(process.env.MONGOLAB_URI);

// init passport strat
// routers
// load routers
// assign base routes to routers
// start server
app.listen(process.env.PORT, function() {
  console.log('server running on port: ' + process.env.PORT );
});
