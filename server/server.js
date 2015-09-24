'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var passport = require('passport');
var eat_auth = require('../lib/eat_auth');
var session = require('express-session');
var cors = require('cors');
var uuid = require('uuid');

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
require('../lib/passport_strategy')(passport);
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

require('./routes/message_routes')(messageRouter);
require('./routes/channel_routes')(channelRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

io.on('connection', function(socket) {
  console.log('user connected to socket ' + socket.id);
  socket.on('add user', function(username) {
    socket.broadcast.emit('add user bc', username)
    console.log(username);
    socket.username = username;
    // usernames[username] = username;
  });
  socket.on('new message', function(msg) {
    socket.broadcast.emit('new bc message', msg);
  });

  socket.on('new channel', function(channel) {
    console.log(channel);
    socket.broadcast.emit('new channel', channel)
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    console.log('typing from server');
    socket.broadcast.emit('typing bc', socket.username);
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    console.log('stop typing from server');
    socket.broadcast.emit('stop typing bc', socket.username);
  });

  // when a disconnection occurs, we do some things
  socket.on('disconnect', function() {
    console.log('io.emit occured');
    io.emit('client disconnect io', socket.username)
    console.log(socket.username + ' left the chat');
    console.log(socket.id + ' disconnected ');
  });

  socket.on('signOut', function() {
    console.log('signOut occured');
    socket.broadcast.emit('user logged out', socket.username)
  })
});

http.listen(process.env.PORT, function() {
    console.log('server listening on port: %s', process.env.PORT);
});
