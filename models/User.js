const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 40,
			unique: true
		},
		username: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 40,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minlength: 8,
			maxlength: 100
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User }
