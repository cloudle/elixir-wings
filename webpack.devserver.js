#!/usr/bin/env node
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
port = process.env.PORT || 4001;

new WebpackDevServer(webpack(config), {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	stats: {
		colors: true,
	},
	quiet: false,
	noInfo: false,
}).listen(port, '0.0.0.0', function (err, result) {
	if (err) {
		return console.log(err);
	}

	console.log('Listening at http://localhost:'+port);
});

// Exit on end of STDIN
process.stdin.resume();
process.stdin.on('end', function () {
	process.exit(0)
});


// const express = require('express');
// const webpack = require('webpack');
// const config = require('./webpack.config');
//
// const compiler = webpack(config);
// const app = express();
//
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	next();
// });
//
// app.use(require('webpack-dev-middleware')(compiler, {
// 	stats: {
// 		colors: true,
// 	},
// 	quiet: false,
// 	noInfo: false,
// 	historyApiFallback: true,
// 	publicPath: config.output.publicPath,
// 	// headers: {"Access-Control-Allow-Origin": "*"},
// }));
//
// app.listen(4001, '0.0.0.0', function (err) {
// 	if (err) return console.error(err);
// 	console.log('Dev server running on localhost:4001')
// });

// Exit on end of STDIN
// process.stdin.resume();
// process.stdin.on('end', function () {
// 	process.exit(0)
// });