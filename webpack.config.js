const path = require('path');
const webpack = require('webpack');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');
const publicPath = 'http://localhost:4001/';

const env = process.env.MIX_ENV || 'dev';
const prod = env === 'prod';

const entry = './app/entry.js';
const hot = [
	'webpack-dev-server/client?'+publicPath,
	'webpack/hot/only-dev-server',
];

let plugins = [
	new DefinePlugin({
		ENV: JSON.stringify(env)
	})
];

if (env === 'dev') {
	plugins.push(new webpack.HotModuleReplacementPlugin());

	plugins.push(new webpack.NoErrorsPlugin());
	plugins.push(new FlowStatusWebpackPlugin({
		failOnError: true
	}));
}

module.exports = {
	devtool: prod ? null : 'source-map',
	entry: prod ? [entry] : [...hot, entry],
	output: {
		publicPath: publicPath,
		path: path.join(__dirname) + '/priv/static/js',
		filename: 'app.bundle.js',
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.js', '.styl']
	},
	plugins: plugins,
	module: {
		loaders: [
			{
				test: /\.js?$/,
				loaders: prod ? ['babel'] : ['react-hot', 'babel'],
				exclude: path.join(__dirname, 'node_modules'),
				include: path.join(__dirname, 'app')
			},
			{
				test: /\.styl$/,
				loader: 'style!css!stylus'
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'file?name=[name].[ext]'
			},
		],
	},
	stylus: {
		use: [
			require('poststylus')(['autoprefixer', 'rucksack-css'])
		]
	}
};