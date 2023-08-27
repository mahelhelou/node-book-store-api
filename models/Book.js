const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 200
		},
		// Relationship
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'Author' // Referencing Author model
		},
		description: {
			type: String,
			required: true,
			trim: true
		},
		price: {
			type: Number,
			required: true,
			min: 0
		},
		cover: {
			type: String,
			required: true,
			enum: ['Soft cover', 'Hard cover']
		}
	},
	{
		timestamps: true
	}
)

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
