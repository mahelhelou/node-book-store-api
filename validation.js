const Joi = require('joi')

exports.validateRegisterUser = reqInputs => {
	const userSchema = Joi.object({
		email: Joi.string().required().trim().min(2).max(40).email(),
		username: Joi.string().required().trim().min(3).max(40),
		password: Joi.string().required().min(8).max(100),
		isAdmin: Joi.bool()
	})

	return userSchema.validate(reqInputs)
}

exports.validateLoginUser = reqInputs => {
	const userSchema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required()
	})

	return userSchema.validate(reqInputs)
}

exports.validateUpdateUser = reqInputs => {
	const userSchema = Joi.object({
		email: Joi.string().trim().min(2).max(40).email(),
		username: Joi.string().trim().min(3).max(40),
		password: Joi.string().min(8).max(100),
		isAdmin: Joi.bool()
	})

	return userSchema.validate(reqInputs)
}

exports.validateCreateAuthor = reqInputs => {
	const authorSchema = Joi.object({
		firstName: Joi.string().required().trim().min(3).max(40),
		lastName: Joi.string().required().trim().min(3).max(40),
		nationality: Joi.string().required().trim().min(3).max(40),
		image: Joi.string()['default']('fallback-avatar.png').required()
	})

	return authorSchema.validate(reqInputs)
}

exports.validateUpdateAuthor = reqInputs => {
	const authorSchema = Joi.object({
		firstName: Joi.string().trim().min(3).max(40),
		lastName: Joi.string().trim().min(3).max(40),
		nationality: Joi.string().trim().min(3).max(40),
		image: Joi.string()['default']('fallback-avatar.png')
	})

	return authorSchema.validate(reqInputs)
}

exports.validateCreateBook = reqInputs => {
	const bookSchema = Joi.object({
		title: Joi.string().required().trim().min(3).max(200),
		author: Joi.string().required().min(3).max(100),
		description: Joi.string().required().trim(),
		price: Joi.number().required().min(0),
		cover: Joi.string().required().valid('Soft cover', 'Hard cover')
	})

	return bookSchema.validate(reqInputs)
}

exports.validateUpdateBook = reqInputs => {
	const bookSchema = Joi.object({
		title: Joi.string().trim().min(3).max(200),
		author: Joi.string().min(3).max(100),
		description: Joi.string().trim(),
		price: Joi.number().min(0),
		cover: Joi.string().valid('Soft cover', 'Hard cover')
	})

	return bookSchema.validate(reqInputs)
}
