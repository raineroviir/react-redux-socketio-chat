'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config');
var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app)
var mongoose = require('mongoose');


process.env.MONGOLAB_URI = process.env.MONGOLAB_URI || 'mongodb://localhost/turtle_dev';

mongoose.connect(process.env.MONGOLAB_URI);

//load our build

var messageRouter = express.Router();
require('./routes/message_routes.js')(messageRouter);

app.use('/api', messageRouter)
app.use('/', express.static(path.join(__dirname, '..','static')));

// start server
var myWebpackServer = new WebpackDevServer(webpack(config), {
 publicPath: config.output.publicPath,
 hot: true,
 // lazy: true,
 // filename: 'bundle.js',
 historyApiFallback: true,
 headers: { "X-Custom-Header": "yes" },
 stats: { colors: true }
})

myWebpackServer.listen(3030, 'localhost', function(err) {
 if (err) {
   console.log(err);
 }
 console.log('webpack dev server up at localhost: 3030')
});

//note- IO does not work with a webpack dev server at the moment
