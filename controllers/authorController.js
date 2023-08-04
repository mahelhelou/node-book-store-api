const asyncHandler = require('express-async-handler')
const Author = require('../models/Author')
const validation = require('../validation')
// const authorsData = require('../data/authorsData')

/**
 * @desc Create A New Author
 * @route /api/authors
 * @method POST
 * @access public
 * @returns Inserted author details
 * @throws Error if the request inputs are invalid (JOI library)
 */
exports.create = async (req, res) => {
	const { error } = validation.validateCreateAuthor(req.body)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	// Local DB file
	/* const author = {
		id: authorsData.length + 1,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		nationality: req.body.nationality,
		image: req.body.image
	}

	authorsData.push(author) */

	// MongoDB
	try {
		const author = new Author({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			nationality: req.body.nationality,
			image: req.body.image
		})

		await author.save()
		res.status(201).json(author) // 201: Created successfully
	} catch (error) {
		console.log('Error! ', error)
		res.status(400).json({ message: 'Error saving author to the DB.' })
	}
}

/**
 * @desc Retrieve All Authors
 * @route /api/authors
 * @method GET
 * @access public
 * @returns Array of author objects
 */

// With regular Try-Catch block
exports.list = async (req, res) => {
	// Local DB file
	// res.status(200).json(authorsData)

	// MongoDB
	try {
		// const authors = await Author.find().sort({ firstName: 1 }) // ASCE
		// const authors = await Author.find().sort({ firstName: -1 }) // DESC
		// const authors = await Author.find().sort({ firstName: 1 }).select('firstName lastName') // View only first name and last name
		const authors = await Author.find().sort({ firstName: 1 }).select('firstName lastName -_id') // Exclude id
		res.status(200).json(authors)
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
}

// With express-async-handler npm package
exports.list2 = asyncHandler(async (req, res) => {
	const authors = await Author.find()
	res.status(200).json(authors)
})

/**
 * @desc Get Author By Id
 * @route /api/authors/:id
 * @method GET
 * @access public
 * @returns Author details
 * @throws Error if the author not found
 */
exports.findById = async (req, res) => {
	// Local DB file
	// const author = authorsData.find(author => author.id === parseInt(req.params.id))

	// MongoDB
	try {
		const author = await Author.findById(req.params.id)
		if (!author) {
			return res.status(404).json({ message: '404! Author not found.' })
		}

		res.status(200).json(author)
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
}

/**
 * @desc Update An Author By ID
 * @route /api/authors/<id>
 * @method PUT
 * @access public
 * @returns Success message
 * @throws Error if the author is not found
 */
exports.update = async (req, res) => {
	const { error } = validation.validateUpdateAuthor(req.body, false)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	// Local DB file
	/* const author = authorsData.find(author => author.id === parseInt(req.params.id))
	if (author) {
		res.status(200).json({ message: 'author has been updated.' })
	} else {
		res.status(400).json({ message: 'author not found.' })
	} */

	// MongoDb
	try {
		const author = await Author.findById(req.params.id)
		if (!author) {
			return res.status(404).json({ message: '404! Author not found!' })
		}

		const updatedAuthor = await Author.findByIdAndUpdate(
			req.params.id,
			{
				$set: {
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					nationality: req.body.nationality,
					image: req.body.image
				}
			},
			{ new: true } // Returns the updated version on save
		)

		res.status(200).json(updatedAuthor)
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
}

/**
 * @desc Delete An Author
 * @route /api/authors/:id
 * @method DELETE
 * @access public
 * @returns Success message if the author is deleted
 * @throws Error if the author is not exists
 */
exports.delete = async (req, res) => {
	// Local DB file
	/* const author = authorsData.find(author => author.id === parseInt(req.params.id))

	if (!author) {
		return res.status(404).json({ message: '404! Author not found.' })
	}

	res.status(201).json({ message: 'Author has been deleted.' }) */

	try {
		const author = await Author.findById(req.params.id)
		if (!author) {
			return res.status(400).json({ message: '404! Author not found.' })
		}

		await Author.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Author has been deleted.' })
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
}
