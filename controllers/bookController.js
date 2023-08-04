const asyncHandler = require('express-async-handler')

const Book = require('../models/Book')
const validation = require('../validation')
// const booksData = require('../data/booksData')

/**
 * @desc Create A New Book
 * @route /api/books
 * @method POST
 * @access public
 * @returns Inserted book details
 * @throws Error if the request inputs are invalid (JOI library)
 */
exports.create = asyncHandler(async (req, res) => {
	const { error } = validation.validateCreateBook(req.body)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	const book = new Book({
		title: req.body.title,
		author: req.body.author,
		description: req.body.description,
		price: req.body.price,
		cover: req.body.cover
	})

	await book.save()
	res.status(201).json(book)
})

/**
 * @desc Retrieve All Books
 * @route /api/books
 * @method GET
 * @access public
 * @returns Array of book objects
 */
exports.list = asyncHandler(async (req, res) => {
	const books = await Book.find().populate('author', ['_id', 'firstName', 'lastName'])
	res.status(200).json(books)
})

/**
 * @desc Retrieve Book By ID
 * @route /api/books/:id
 * @method GET
 * @access public
 * @returns Book details
 * @throws Error if the book is not exists
 */
exports.findById = asyncHandler(async (req, res) => {
	const book = await Book.findById(req.params.id)
	if (!book) {
		return res.status(404).json({ message: '404! Book not found' })
	}

	res.status(200).json(book)
})

/**
 * @desc Update Book
 * @route /api/books/:id
 * @method PUT
 * @access public
 * @returns Success message
 * @throws Error if the book is not exists
 */
exports.update = asyncHandler(async (req, res) => {
	const { error } = validateBookInputs(req.body, false)
	if (error) {
		return res.status(400).json({ message: error.details[0].message })
	}

	const book = await Book.findById(req.params.id)
	if (!book) {
		return res.status(404).json({ message: '404! Book not found.' })
	}

	const updatedBook = await Book.findByIdAndUpdate(
		req.params.id,
		{
			$set: {
				title: req.body.title,
				author: req.body.author,
				description: req.body.description,
				price: req.body.price,
				cover: req.body.cover
			}
		},
		{ new: true }
	)

	res.status(200).json(updatedBook)
})

/**
 * @desc Delete A Book
 * @route /api/books/:id
 * @method DELETE
 * @access public
 * @returns Success message
 * @throws Error if the book is not exists
 */
exports.delete = asyncHandler(async (req, res) => {
	const book = await Book.findById(req.params.id)
	if (!book) {
		return res.status(404).json({ message: '404! Book not found.' })
	}

	await Book.findByIdAndDelete(req.params.id)
	res.status(201).json({ message: 'Book has been deleted.' })
})
