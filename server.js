'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var passport = require('passport');
var eat_auth = require('./lib/eat_auth');
var session = require('express-session');
var cors = require('cors');
var uuid = require('uuid');
var socketEvents = require('./socketEvents')(io);

//set env vars
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
    console.log(err);
});

//load routers
app.use(cors());
app.use(session({
  secret: 'keyboard kat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());
require('./lib/passport_strategy')(passport);
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();

app.use('/', express.static(path.join(__dirname)));

require('./server/routes/message_routes')(messageRouter);
require('./server/routes/channel_routes')(channelRouter);
require('./server/routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

http.listen(process.env.PORT, function() {
    console.log('server listening on port: %s', process.env.PORT);
});
