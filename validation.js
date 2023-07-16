const Joi = require('joi')

// Reusable function(s) to validate both Create and Update resources
function validateAuthorInputs(reqInputs, isRequired = true) {
	const authorSchema = Joi.object({
		firstName: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		lastName: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		nationality: isRequired ? Joi.string().trim().min(3).max(40).required() : Joi.string().trim().min(3).max(40),
		image: isRequired ? Joi.string()['default']('fallback-avatar.png').required() : Joi.string()('fallback-avatar.png')
	})

	return authorSchema.validate(reqInputs)
}

function validateBookInputs(reqInputs, isRequired = true) {
	const bookSchema = Joi.object({
		title: isRequired ? Joi.string().trim().min(3).max(200).required() : Joi.string().trim().min(3).max(200),
		author: isRequired ? Joi.string().required() : Joi.string(),
		description: isRequired ? Joi.string().trim().required() : Joi.string().trim(),
		price: isRequired ? Joi.number().min(0).required() : Joi.number().min(0),
		cover: isRequired ? Joi.string().valid('Soft cover', 'Hard cover').required() : Joi.string().valid('Soft cover', 'Hard cover')
	})

	return bookSchema.validate(reqInputs)
}

function validateRegisterUser(reqInputs) {
	const userSchema = Joi.object({
		email: Joi.string().trim().min(2).max(40).email().required(),
		username: Joi.string().trim().min(3).max(40).required(),
		password: Joi.string().min(8).max(100).required(),
		isAdmin: Joi.bool()
	})

	return userSchema.validate(reqInputs)
}

function validateLoginUser(reqInputs) {
	const userSchema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})

	return userSchema.validate(reqInputs)
}

function validateUpdateUser(reqInputs) {
	const userSchema = Joi.object({
		email: Joi.string().trim().min(2).max(40).email(),
		username: Joi.string().trim().min(3).max(40),
		password: Joi.string().min(8).max(100),
		isAdmin: Joi.bool()
	})

	return userSchema.validate(reqInputs)
}

module.exports = { validateAuthorInputs, validateBookInputs, validateRegisterUser, validateLoginUser, validateUpdateUser }
