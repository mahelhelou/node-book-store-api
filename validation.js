const Joi = require('joi')

function validateBookInputs(reqInputs, isRequired = true) {
	/* if (!req.body.title || req.body.title.length < 3) {
		res.status(400).json('Title is required and must be more than 3 characters.') // 400: The error is from the client
	} */

	const bookSchema = Joi.object({
		title: isRequired ? Joi.string().trim().min(3).max(200).required() : Joi.string().trim().min(3).max(200),
		author: isRequired ? Joi.string().trim().min(8).max(50).required() : Joi.string().trim().min(8).max(50),
		description: isRequired ? Joi.string().trim().min(15).max(500).required() : Joi.string().trim().min(15).max(500),
		price: isRequired ? Joi.number().min(0).required() : Joi.number().min(0),
		cover: isRequired ? Joi.string().min(6).max(20).required() : Joi.string().min(6).max(20)
	})

	return bookSchema.validate(reqInputs)
}

function validateAuthorInputs(reqInputs, isRequired = true) {
	const authorSchema = Joi.object({
		firstName: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		lastName: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		nationality: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		image: isRequired ? Joi.string().required() : Joi.string()
	})

	return authorSchema.validate(reqInputs)
}

module.exports = { validateBookInputs, validateAuthorInputs }
