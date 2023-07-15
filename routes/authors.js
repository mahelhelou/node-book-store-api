const express = require('express')
const router = express.Router()

const { Author } = require('../models/Author')

const { validateAuthorInputs } = require('../validation')
const authorsData = require('../data/authorsData')

/**
 * @desc Retrieve All Authors
 * @route /api/authors
 * @method GET
 * @access public
 * @returns Array of author objects
 */
router.get('/', async (req, res) => {
	// Local DB file
	// res.status(200).json(authorsData)

	// MongoDB
	try {
		// const authorsList = await Author.find().sort({ firstName: 1 }) // ASCE
		// const authorsList = await Author.find().sort({ firstName: -1 }) // DESC
		// const authorsList = await Author.find().sort({ firstName: 1 }).select('firstName lastName') // View only first name and last name
		const authorsList = await Author.find().sort({ firstName: 1 }).select('firstName lastName -_id') // Exclude id
		res.status(200).json(authorsList)
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
})

/**
 * @desc Get Author Details By Id
 * @route /api/authors/<id>
 * @method GET
 * @access public
 * @returns Author details
 * @throws Error if the author not found
 */
router.get('/:id', async (req, res) => {
	// Local DB file
	// const author = authorsData.find(author => author.id === parseInt(req.params.id))

	// MongoDB
	try {
		const author = await Author.findById(req.params.id)

		if (author) {
			res.status(200).json(author)
		} else {
			res.status(400).json({ message: 'Author not found.' })
		}
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
})

/**
 * @desc Create A New Author
 * @route /api/authors
 * @method POST
 * @access public
 * @returns JSON of created author
 * @throws Error if the request inputs are invalid (JOI library)
 */
router.post('/', async (req, res) => {
	const { error } = validateAuthorInputs(req.body)

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
			// id: authorsData.length + 1,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			nationality: req.body.nationality,
			image: req.body.image
		})

		const result = await author.save()
		res.status(201).json(result)
	} catch (error) {
		console.log('Error! ', error)
		res.status(400).json({ message: 'Error saving author to the DB.' })
	}
})

/**
 * @desc Update An Author By ID
 * @route /api/authors/<id>
 * @method PUT
 * @access public
 * @returns Success message
 * @throws Error if the author is not found
 */
router.put('/:id', async (req, res) => {
	const { error } = validateAuthorInputs(req.body, false)

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
		if (author) {
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
		} else {
			res.status(400).json({ message: 'Sorry! This author is not found!' })
		}
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
})

/**
 * @desc Delete An Author
 * @route /api/authors/<id>
 * @method DELETE
 * @access public
 * @returns Success message
 * @throws Error if the author is not found
 */
router.delete('/:id', async (req, res) => {
	// Local DB file
	/* const author = authorsData.find(author => author.id === parseInt(req.params.id))

	if (author) {
		res.status(200).json({ message: 'author has been deleted.' })
	} else {
		res.status(400).json({ message: 'author not found.' })
	} */

	try {
		const author = await Author.findById(req.params.id)
		if (author) {
			await Author.findByIdAndDelete(req.params.id)
			res.status(200).json({ message: 'Author has been deleted.' })
		} else {
			res.status(400).json({ message: 'Sorry! This author is not found.' })
		}
	} catch (error) {
		console.log('Error! ', error)
		res.status(500).json({ message: 'Please try again later.' })
	}
})

module.exports = router
