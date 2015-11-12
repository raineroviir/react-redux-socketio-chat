'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var session = require('express-session');
var cors = require('cors');
var passport = require('passport');
require('./config/passport')(passport);
var io = require('socket.io')(http);
// attach socket.io onto our server
var socketEvents = require('./socketEvents')(io);

//set env vars
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
    console.log(err);
});

app.use(cors());
app.use(session({
  secret: 'I need more minerals',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 6000000 }
}));
app.use(passport.initialize());
app.use(passport.session());

//load routers
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();
require('./server/routes/message_routes')(messageRouter);
require('./server/routes/channel_routes')(channelRouter);
require('./server/routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

app.use('/', express.static(path.join(__dirname)));

http.listen(process.env.PORT, function() {
    console.log('server listening on port: %s', process.env.PORT);
});
