function notFound(req, res, next) {
	const error = new Error(`Not Found! ${req.originalUrl}`)
	res.status(404)
	next(error) // Hmmmm! The route/resource isn't found, give it to the next middleware
}

/**
 * Instead of returning an HTML error response, return a json format
 * err is null by default
 */
function errorHandling(err, req, res, next) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
	res.status(statusCode).json({ message: err.message })
}

module.exports = { notFound, errorHandling }
