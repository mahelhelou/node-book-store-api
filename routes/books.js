const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')

const { Book } = require('../models/Book')
const { validateBookInputs } = require('../validation')
// const booksData = require('../data/booksData')

/**
 * @desc Retrieve All Books
 * @route /api/books
 * @method GET
 * @access public
 * @returns Array of book objects
 */
router.get(
	'/',
	asyncHandler(async (req, res) => {
		const books = await Book.find().populate('author', ['_id', 'firstName', 'lastName'])
		res.status(200).json(books)
	})
)

/**
 * @desc Retrieve Book Details By ID
 * @route /api/books/<id>
 * @method GET
 * @access public
 * @returns Book details
 * @throws Error if the book is not found
 */
router.get(
	'/:id',
	asyncHandler(async (req, res) => {
		const book = await Book.findById(req.params.id)

		if (book) {
			res.status(200).json(book)
		} else {
			res.status(404).json({ message: 'Book not found!' })
		}
	})
)

/**
 * @desc Create A New Book
 * @route /api/books
 * @method POST
 * @access public
 * @returns JSON of created book
 * @throws Error if the request inputs are invalid (JOI library)
 */
router.post(
	'/',
	asyncHandler(async (req, res) => {
		const { error } = validateBookInputs(req.body)

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

		const result = await book.save()
		res.status(201).json(result)
	})
)

/**
 * @desc Update Book By ID
 * @route /api/books/<id>
 * @method PUT
 * @access public
 * @returns Success message
 * @throws Error if the book is not found
 */
router.put(
	'/:id',
	asyncHandler(async (req, res) => {
		const { error } = validateBookInputs(req.body, false)

		if (error) {
			return res.status(400).json({ message: error.details[0].message })
		}

		const book = await Book.findById(req.params.id)

		if (book) {
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
		} else {
			res.status(400).json({ message: 'Book not found.' })
		}
	})
)

/**
 * @desc Delete A Book
 * @route /api/books/<id>
 * @method DELETE
 * @access public
 * @returns Success message
 * @throws Error if the book is not found
 */
router.delete(
	'/:id',
	asyncHandler(async (req, res) => {
		const book = await Book.findById(req.params.id)

		if (book) {
			await Book.findByIdAndDelete(req.params.id)
			res.status(200).json({ message: 'Book has been deleted.' })
		} else {
			res.status(400).json({ message: 'Book not found.' })
		}
	})
)

module.exports = router
