'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');

// var webpackConfig = require('../webpack.production.config.js');
// var compiler = webpack(webpackConfig);

//set env vars

process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev';

mongoose.connect(process.env.MONGOLAB_URI);

//load our build
// app.use('/', express.static(path.join(__dirname, '..','static')));

//load routers
var messageRouter = express.Router();
require('./routes/message_routes.js')(messageRouter);
// app.use('/', express.static(path.join(__dirname, '..','static')));
app.use('/', express.static(path.join(__dirname, '..', 'dist')));

// start server
// var myWebpackServer = new WebpackDevServer(webpack(config), {
// 	publicPath: config.output.publicPath,
// 	hot: true,
// 	// lazy: true,
// 	// filename: 'bundle.js',
// 	historyApiFallback: true,
// 	headers: { "X-Custom-Header": "yes" },
// 	stats: { colors: true }
// })

// server..listen(3001, 'localhost', function(err) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	server.listen(app.get(3001));
// 	console.log('socketio running on localhost:3000');
// 	console.log('webpack dev server at localhost:3001');
// })
// server.listen(app.get(3000));

// myWebpackServer.listen(3030, 'localhost', function(err) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log('webpack dev server up at localhost: 3030')
// });

//load app with routers and static content

app.use('/api', messageRouter);

// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true,
//     stats: { colors: true },
//     publicPath: webpackConfig.output.publicPath
// }));

// app.use(require("webpack-hot-middleware")(compiler, {
//   log: console.log, heartbeat: 10 * 1000
// }));

io.on('connection', function(socket) {
  socket.broadcast.emit('user connected!');
  console.log('user connected to socket ' + socket.id);

  socket.on('new message', function(data) {
    console.log(data);
    socket.broadcast.emit('new bc message', data);
    // io.emit('new bc message', data);
    // socket.broadcast.emit('new message bc', {
    //   message:data
    // });
  });

  socket.on('new user', function(data) {
    // socket.username = username;
    //add username
  })
  socket.on('disconnect', function() {
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
