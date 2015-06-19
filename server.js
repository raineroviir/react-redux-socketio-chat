'use strict';

var express  = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var app      = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var eat_io_auth = require('./lib/eat_auth_io.js');
var cors = require('./cors');
var redirect = require("express-redirect");

var connectedUses = {};

redirect(app);

// set environment var
process.env.PORT = process.env.PORT || 3000;
process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'this is a temp AUTH_SECRET';
process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev';

// connect mongoose
mongoose.connect(process.env.MONGOLAB_URI);

// app.all('/', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   next();
//  });

// init passport strat
app.use(passport.initialize());
require('./lib/passport_strategy.js')(passport);;
app.use(cors());

// routers
var usersRouter = express.Router();
var authRouter = express.Router();
var contactRouter = express.Router();
var messageRouter = express.Router();

// load routers
require('./routes/user_routes.js')(usersRouter);
require('./routes/auth_routes.js')(authRouter, passport);
require('./routes/contacts_routes.js')(contactRouter);
require('./routes/message_routes.js')(messageRouter);

// assign base routes to routers
app.use('/api', usersRouter);
app.use('/api', authRouter);
app.use('/api', contactRouter);
app.use('/api', messageRouter);
// app.redirect('/dashboard', '/#/dashboard');


io.on('connection', function(socket){
	console.log(socket.handshake.headers.cookie);
	//var cookie = {};
	//socket.handshake.headers.cookie.toString().split(' ').forEach(function(param) {
		//cookie[param.split('=')[0]] = param.split('=')[1];
	//});
	//console.log(cookie);
	//var eat = cookie.eat;

	eat_io_auth( socket, function(err, user) {
		if (err) {
			console.log('socket fucked up ', socket.id);
			return socket.emit('login', {success: false, msg: 'fuck'});
		};
		console.log(user);
		connectedUses[user.username] = {socket_id: socket.id}
		console.log(connectedUses);

		socket.emit('login', {username: user.username, msg: 'login success', success: 'true'});
	});
 	socket.emit('news', {msg: 'sup slug'});

  socket.on('chat message', function(msg){
		console.log(msg);
		eat_io_auth(socket, function(err, user) {
			if (err) return socket.emit('login to do that');
			io.emit('chat message', user.username + ": " + msg);
		});
  });
});

io.on('disconnect', function(socket){

});
//load our build
app.use(express.static(__dirname + '/build'));

// start server
http.listen(process.env.PORT, function() {
  console.log('server running on port: ' + process.env.PORT );
});
