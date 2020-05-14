var path = require('path');
const merge = require("webpack-merge");

const commonConfig = require("./webpack.common.config.js")

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = merge(commonConfig, {
	mode: "production",
	optimization: {
		// splitChunks: {
		// 	cacheGroups: {
		// 		defaultVendors: {
		// 			test: /[\\/]node_modules[\\/]/,
		// 			name: "vendors",
		// 			chunks: "all"
		// 		}
		// 	}
		// },
		minimize: true,
		minimizer: [new TerserPlugin({
			parallel: true,
			terserOptions: {
				mangle: true,
				output: {
					comments: false
				},
			},
			extractComments: false
		})],
	},
	module: {
		rules: [
			{
		        test: /\.(css|sass|scss)$/i,
		        use: [
		        	{
		        		loader: MiniCssExtractPlugin.loader,
		        		options: {
		        			publicPath: "./"
		        		}
		        	},
        			{
        	            loader: 'css-loader',
        	            options: {
        	              importLoaders: 1
        	            }
        			},
        			"postcss-loader",
		        	"sass-loader"
		        ],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			// filename: "assets/css/[name].[contenthash].css",
			filename: "[name].[contenthash].css",
			chunkFilename: "[name].[id].css"
		})
	]
})