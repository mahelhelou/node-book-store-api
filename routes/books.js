const express = require('express')
const router = express.Router()

const { validateBookInputs } = require('../validation')
const booksData = require('../data/booksData')

/**
 * @desc Retrieve All Books
 * @route /api/books
 * @method GET
 * @access public
 * @returns Array of book objects
 */
router.get('/', (req, res) => {
	res.json(booksData)
})

/**
 * @desc Retrieve Book Details By ID
 * @route /api/books/<id>
 * @method GET
 * @access public
 * @returns Book details
 * @throws Error if the book is not found
 */
router.get('/:id', (req, res) => {
	const book = booksData.find(book => book.id === parseInt(req.params.id))

	if (book) {
		res.status(200).json(book)
	} else {
		res.status(404).json({ message: 'Book not found!' })
	}
})

/**
 * @desc Create A New Book
 * @route /api/books
 * @method POST
 * @access public
 * @returns JSON of created book
 * @throws Error if the request inputs are invalid (JOI library)
 */
router.post('/', (req, res) => {
	/**
	 * Postman: POST -> localhost:3000/api/books -> Body -> json (Not text)
	 * Instead of manual check for request body (Title, author, description...), we can use Joi npm package (+7 millions download every week)
	 */
	const { error } = validateBookInputs(req.body)

	if (error) {
		// return res.status(400).json(error)
		return res.status(400).json({ message: error.details[0].message })
	}

	const book = {
		id: booksData.length + 1,
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		price: req.body.price,
		cover: req.body.cover
	}

	// console.log(req.body) // UT
	booksData.push(book)
	res.status(201).json(book) // 201: Created successfully
})

/**
 * @desc Update Book By ID
 * @route /api/books/<id>
 * @method PUT
 * @access public
 * @returns Success message
 * @throws Error if the book is not found
 */
router.put('/:id', (req, res) => {
	const { error } = validateBookInputs(req.body, false)

	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	const book = booksData.find(book => book.id === parseInt(req.params.id))

	if (book) {
		res.status(200).json({ message: 'Book has been updated.' })
	} else {
		res.status(400).json({ message: 'Book not found.' })
	}
})

/**
 * @desc Delete A Book
 * @route /api/books/<id>
 * @method DELETE
 * @access public
 * @returns Success message
 * @throws Error if the book is not found
 */
router.delete('/:id', (req, res) => {
	const book = booksData.find(book => book.id === parseInt(req.params.id))

	if (book) {
		res.status(200).json({ message: 'Book has been deleted.' })
	} else {
		res.status(400).json({ message: 'Book not found.' })
	}
})

module.exports = router
