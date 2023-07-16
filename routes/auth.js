const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const { User } = require('../models/User')
const { validateRegisterUser, validateLoginUser } = require('../validation')

/**
 * @desc Register New User
 * @route /api/auth/register
 * @method POST
 * @access public
 * @returns Success if the user registered
 * @throws Error if the user exists
 */
router.post(
	'/register',
	asyncHandler(async (req, res) => {
		const { error } = validateRegisterUser(req.body)

		if (error) {
			res.status(400).json({ message: error.details[0].message })
		}

		let user = await User.findOne({ email: req.body.email })
		if (user) {
			res.status(400).json({ message: 'User is already exists.' })
			return
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
		const token = null
		const { password, ...others } = result._doc // Exclude password from the result
		res.status(201).json({ ...others, token })
	})
)

/**
 * @desc User Login
 * @route /api/auth/login
 * @method POST
 * @access public
 * @returns Success if the user exists
 * @throws Error if the user is not exist
 */
router.post(
	'/login',
	asyncHandler(async (req, res) => {
		const { error } = validateLoginUser(req.body)

		if (error) {
			return res.status(400).json({ message: error.details[0].message })
		}

		let user = await User.findOne({ email: req.body.email })
		if (!user) {
			return res.status(400).json({ message: 'Invalid email or password.' })
		}

		const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

		if (!isPasswordMatch) {
			return res.status(400).json({ message: 'Invalid email or password.' })
		}

		const token = null
		const { password, ...others } = user._doc
		res.status(201).json({ ...others, token })
	})
)

module.exports = router
