function logger(req, res, next) {
	console.log(`${req.method} ${req.protocol}//${req.get('host')}`)

	next()
}

module.exports = { logger }
