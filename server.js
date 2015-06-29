'use strict';

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var express  = require('express');
var path = require('path');
var app  = express();

//load our build
app.use(require('serve-static')(path.join(__dirname, '..','static')));

// start server

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true
	}
}).listen(3000, 'localhost', function(err) {
	if (err) {
		console.log(err);
	}

	console.log('listening at localhost:3000')
})

// http.listen(process.env.PORT, function() {
//   console.log('server running on port: ' + process.env.PORT );
// });
