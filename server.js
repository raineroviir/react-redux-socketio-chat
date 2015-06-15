'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();

// set environment var
process.env.PORT = process.env.PORT || 3000;
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev';

// connect mongoose
mongoose.connect(process.env.MONGOLAB_URI);

// init passport strat
app.use(passport.initialize());
require('./lib/passport_strategy.js');

// routers
var usersRouter = express.Router();
var authRouter = express.Router();
var contactRouter = express.Router();

// load routers
require('./routes/user_routes.js')(usersRouter);
require('./routes/auth_routes.js')(authRouter, passport);
require('./routes/contacts_routes.js')(contactRouter);

// assign base routes to routers
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', contactRouter);

//load our build
app.use(express.static(__dirname + '/build'));

// start server
app.listen(process.env.PORT, function() {
  console.log('server running on port: ' + process.env.PORT );
});
