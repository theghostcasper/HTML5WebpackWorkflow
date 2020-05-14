var path = require('path');
const ROOT_PATH = path.resolve(__dirname, "..");

const merge = require("webpack-merge");

const commonConfig = require("./webpack.common.config.js")

module.exports = merge(commonConfig, {
	mode: "development",
	output: {
		path: path.resolve(ROOT_PATH, "dist"),
		filename: '[name].[hash].bundle.js',
		chunkFilename: '[name].[hash].js',
	},
	devServer: {
		contentBase: [
			path.resolve(ROOT_PATH, "src"),
		],
		// watchContentBase: true,
		/* HMR FOR HTML */
		before(app, server, compiler) {
		    const watchFiles = ['.html'];

		    compiler.plugin('done', () => {
		      const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);

		      if (this.hot && changedFiles.some(filePath => watchFiles.includes(path.parse(filePath).ext))) {
		        server.sockWrite(server.sockets, 'content-changed');
		      }
		    });
		},
		compress: false,
		port: 8000,
		host: "localhost",
		open: true,
		hot: true,
		// publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(scss|css|sass)$/i,
				use: [
					'style-loader',
					{
			            loader: 'css-loader',
			            options: {
			              importLoaders: 1
			            }
					},
					"postcss-loader",
					"sass-loader"
				]
			}
		]
	}
})