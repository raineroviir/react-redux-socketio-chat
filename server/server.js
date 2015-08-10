'use strict';

// var webpack = require('webpack');
// var WebpackDevServer = require('webpack-dev-server');
// var config = require('../webpack.config');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
var passport = require('passport');
var eat_auth = require('../lib/eat_auth');

var cors = require('cors');

//not using JWT at the moment so these can be erased
var jwt = require('jsonwebtoken');
var socketio_jwt = require('socketio-jwt');
var jwt_secret = 'foo bar big secret';
// var webpackConfig = require('../webpack.production.config.js');
// var compiler = webpack(webpackConfig);

//set env vars
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';

mongoose.connect(process.env.MONGOLAB_URI);

//load routers
app.use(cors());
app.use(passport.initialize());
require('../lib/passport_strategy')(passport);
var messageRouter = express.Router();
var usersRouter = express.Router();

app.use('/', express.static(path.join(__dirname, '..', 'dist')));

require('./routes/message_routes')(messageRouter);
require('./routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);

// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true,
//     stats: { colors: true },
//     publicPath: webpackConfig.output.publicPath
// }));

// app.use(require("webpack-hot-middleware")(compiler, {
//   log: console.log, heartbeat: 10 * 1000
// }));

// io.use(socketio_jwt.authorize({
//   secret: jwt_secret,
//   handshake: true
// }));

io.on('connection', function(socket) {
  console.log('user connected to socket ' + socket.id);
  // console.log(socket.decoded_token.email, 'connected');
  socket.on('new message', function(data) {
    console.log('server emit');
    socket.broadcast.emit('new bc message', data);
    // socket.broadcast.removeAllListeners('new bc message');
  });

  socket.on('disconnect', function(user) {
    // socket.broadcast.emit('bc disconnect', user + ' disconnected');
    console.log(socket.id + ' disconnected ');
  });
});

http.listen(3000, function() {
    console.log('socket.io server is listening on 3000');
});

// io.on('connection', function (socket) {
//   var addedUser = false;

//   // when the client emits 'new message', this listens and executes
//   socket.on('new message', function (data) {
//     // we tell the client to execute 'new message'
//     socket.broadcast.emit('new message', {
//       username: socket.username,
//       message: data
//     });
//   });

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

//   // when the client emits 'typing', we broadcast it to others
//   socket.on('typing', function () {
//     socket.broadcast.emit('typing', {
//       username: socket.username
//     });
//   });

//   // when the client emits 'stop typing', we broadcast it to others
//   socket.on('stop typing', function () {
//     socket.broadcast.emit('stop typing', {
//       username: socket.username
//     });
//   });

//   // when the user disconnects.. perform this
//   socket.on('disconnect', function () {
//     // remove the username from global usernames list
//     if (addedUser) {
//       delete usernames[socket.username];
//       --numUsers;

//       // echo globally that this client has left
//       socket.broadcast.emit('user left', {
//         username: socket.username,
//         numUsers: numUsers
//       });
//     }
//   });
// });
