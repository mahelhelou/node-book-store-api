const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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

// Generate token for logged in users (Use regular function to get benefit from (this))
userSchema.methods.generateToken = function () {
	return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET_KEY, {
		expiresIn: '30d'
	})
}

const User = mongoose.model('User', userSchema)

module.exports = User
