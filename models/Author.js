const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 40
		},
		lastName: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 40
		},
		nationality: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 40
		},
		image: {
			type: String,
			default: 'fallback-avatar.png'
		}
	},
	{
		timestamps: true
	}
)

const Author = mongoose.model('Author', authorSchema)

module.exports = Author
