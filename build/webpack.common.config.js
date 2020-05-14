const path = require('path');
const ROOT_PATH = path.resolve(__dirname, "..");

/* Common Plugins */
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: {
		main: './src/main.js'
	},
	output: {
		libraryTarget: 'umd',
		path: path.resolve(ROOT_PATH, "dist"),
		filename: '[name].[contenthash].bundle.js',
		chunkFilename: '[name].[contenthash].js',
		// globalObject: 'this'
	},
	module: {
		rules: [
			{
		        test: /\.html$/i,
		        loader: 'html-loader',
			},
			{
				enforce: 'pre',
		        test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'eslint-loader',
		        options: {
		        	cache: true,
		        	fix: true
		        }
		    },
		    {
		    	test: /\.js$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader'	
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
		        loader: 'file-loader',
		        options: {
		        	outputPath: "assets/img",
		        	name: '[name][contenthash].[ext]',
		        },
		    },
		    {
		    	test: /\.(ttf|otf|ogg|woff)$/i,
		    	loader: "file-loader",
		    	options: {
		    		outputPath: "assets/fonts",
		    		name: "[name].[ext]"
		    	}
		    }
		]
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: "index.html",
			template: "./src/index.html",
		}),
		new HtmlWebpackPlugin({
			alwaysWriteToDisk: true,
			filename: "about.html",
			template: "./src/about.html",
		}),
		new CopyWebpackPlugin([
			{ from: "./static", to: "static" }
		]),
		new HtmlWebpackHarddiskPlugin(),

	]
}