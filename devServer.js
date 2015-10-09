'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');
var passport = require('passport');
var eat_auth = require('./lib/eat_auth');
var session = require('express-session');
var cors = require('cors');
var uuid = require('uuid');

//set env vars
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
    console.log(err);
});

var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));




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

require('./server/routes/message_routes')(messageRouter);
require('./server/routes/channel_routes')(channelRouter);
require('./server/routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

app.use('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'developmentIndex.html'));
});

var webpackServer = app.listen(3001, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3001');
});

var io = require('socket.io')(webpackServer);
var socketEvents = require('./socketEvents')(io);
