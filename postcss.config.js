const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
	plugins: [
		require('autoprefixer'),
		process.env.NODE_ENV.toLowerCase() === 'production' ? purgecss({ content: ['./**/*.html']}) : false,
	]
}