const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/User')
const validation = require('../validation')

/**
 * @desc Register New User
 * @route /api/register
 * @method POST
 * @access public
 * @returns Success if the user is registered successfully
 * @throws Error if the user already exists
 */
exports.register = asyncHandler(async (req, res) => {
	const { error } = validation.validateRegisterUser(req.body)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	let user = await User.findOne({ email: req.body.email })
	if (user) {
		return res.status(400).json({ message: 'User is already exists. Try to login.' })
	}

	const salt = await bcrypt.genSalt(10)
	req.body.password = await bcrypt.hash(req.body.password, salt)

	user = new User({
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		isAdmin: req.body.isAdmin
	})

	const result = await user.save()
	/**
	 * Generate a new token for the authenticated user
	 * @param (payload, secretkey, expiration)
	 * expirersIn: '4d' for 4 days, '4h' for 4 hours, '4m' for 4 mins
	 */
	const token = null
	const { password, ...others } = result._doc // Exclude password from the result
	res.status(201).json({ ...others, token })
})

/**
 * @desc User Login
 * @route /api/login
 * @method POST
 * @access public
 * @returns Success if the user is logged in successfully
 * @throws Error if the user is not exist || if the user is NOT logged in successfully
 */
exports.login = asyncHandler(async (req, res) => {
	const { error } = validation.validateLoginUser(req.body)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	let user = await User.findOne({ email: req.body.email })
	if (!user) {
		return res.status(404).json({ message: '404! User not found.' })
	}

	const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

	if (!isPasswordMatch) {
		return res.status(400).json({ message: 'Invalid email or password.' })
	}

	const token = user.generateToken()
	const { password, ...others } = user._doc
	res.status(201).json({ ...others, token })
})

/**
 * @desc Forgot Password
 * @route /api/forgot-password
 * @method GET
 * @access public
 * @returns Forgot password view
 */
exports.forgotPassword = asyncHandler((req, res) => {
	res.render('forgot-password')
})

/**
 * @desc Update User
 * @route /api/profile/:id
 * @method POST
 * @access public
 * @returns Success message
 * @throws Error if the user is not exist
 */
exports.update = asyncHandler(async (req, res) => {
	const { error } = validation.validateUpdateUser(req.body)
	if (error) {
		res.status(400).json({ message: error.details[0].message })
	}
})
