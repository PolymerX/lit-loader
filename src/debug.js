module.exports = msg =>
	process.env.DEBUG === '*' || process.env.DEBUG === 'lit-loader' ?
		console.log('[DEBUG] lit-loader:', msg) : null;
