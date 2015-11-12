'use strict';

var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
var mongoose = require('mongoose');

var eat_auth = require('./lib/eat_auth');
var session = require('express-session');
var cors = require('cors');
var uuid = require('uuid');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var app = express();
var compiler = webpack(config);

var passport = require('passport');
require('./config/passport')(passport);

var User = require('./server/models/User');
//set env vars
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/chat_dev';
process.env.PORT = process.env.PORT || 3000;

// connect our DB
mongoose.connect(process.env.MONGOLAB_URI);
process.on('uncaughtException', function (err) {
  console.log(err);
});

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
  cookie: { maxAge: 6000000000 }
}));
app.use(passport.initialize());
app.use(passport.session());
var messageRouter = express.Router();
var usersRouter = express.Router();
var channelRouter = express.Router();

require('./server/routes/message_routes')(messageRouter);
require('./server/routes/channel_routes')(channelRouter);
require('./server/routes/user_routes')(usersRouter, passport);
app.use('/api', messageRouter);
app.use('/api', usersRouter);
app.use('/api', channelRouter);

app.get('/api/auth/facebook', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));
app.get('/api/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.post('/api/sign_up', passport.authenticate('local-signup'), function(req, res) {
  res.json(req.user);
});

app.post('/api/sign_in', passport.authenticate('local-login'), function(req, res) {
  res.json(req.user);
});

app.get('/api/signout', function(req, res) {
  req.logout();
  res.end();
});

app.get('/api/clientsOnline', function(req, res) {
  res.json(io.engine.clientsCount);
})

app.use('/', express.static(path.join(__dirname)));
var webpackServer = app.listen(process.env.PORT, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('server listening on port: %s', process.env.PORT);
});

var io = require('socket.io')(webpackServer);
var socketEvents = require('./socketEvents')(io);
