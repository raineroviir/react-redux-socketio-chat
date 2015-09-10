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

//load routers
app.use(cors());
app.use(session({
  // genid: function(req) {
  //   return uuid.v4()
  // },
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

// io.use(socketio_jwt.authorize({
//   secret: jwt_secret,
//   handshake: true
// }));

// var usernames = {};
io.on('connection', function(socket) {
  console.log('user connected to socket ' + socket.id);
  socket.on('add user', function(username) {
    socket.broadcast.emit('add user bc', username)
    console.log('added user!');
    socket.username = username;
    // usernames[username] = username;
  });
  socket.on('new message', function(data) {
    socket.broadcast.emit('new bc message', data);
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
//
// io.on('connection', function (socket) {
//   var addedUser = false;
//
//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', function (data) {
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });
//
//   // when the client emits 'add user', this listens and executes
//   socket.on('add user', function (username) {
//     // we store the username in the socket session for this client
//     socket.username = username;
//     // add the client's username to the global list
//     usernames[username] = username;
//     ++numUsers;
//     addedUser = true;
//     socket.emit('login', {
//       numUsers: numUsers
//     });
//     // echo globally (all clients) that a person has connected
//     socket.broadcast.emit('user joined', {
//       username: socket.username,
//       numUsers: numUsers
//     });
//   });
//
// // when the client emits 'typing', we broadcast it to others
// socket.on('typing', function () {
//   socket.broadcast.emit('typing', {
//     username: socket.username
//   });
// });
//
// // when the client emits 'stop typing', we broadcast it to others
// socket.on('stop typing', function () {
//   socket.broadcast.emit('stop typing', {
//     username: socket.username
//   });
// });
//
//   // when the user disconnects.. perform this
//   socket.on('disconnect', function () {
//     // remove the username from global usernames list
//     if (addedUser) {
//       delete usernames[socket.username];
//       --numUsers;
//
//       // echo globally that this client has left
//       socket.broadcast.emit('user left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//   });
// });
