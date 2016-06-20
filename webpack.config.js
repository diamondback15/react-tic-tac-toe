var path = require('path');
var webpack = require('webpack');
var loaders = require('./webpack.loaders');

module.exports = {
	entry: [
		'webpack/hot/only-dev-server',
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'./app.jsx'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public/js'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx', 'scss']
	},
	module: {
		loaders: loaders
	},
	devServer: {
		contentBase: "./public",
			noInfo: true,
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.NoErrorsPlugin()
	]
}