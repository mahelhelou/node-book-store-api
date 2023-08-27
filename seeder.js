const mongoose = require('mongoose')
require('dotenv').config()

const data = require('./database/data')
const colors = require('colors')
const Author = require('./models/Author')
const Book = require('./models/Book')

const start = async () => {
	try {
		await mongoose.connect(process.env.CONNECTION_STRING)
	} catch (error) {
		console.log('Error! ', error)
	}
}

start()

const importData = async () => {
	try {
		await Author.deleteMany()
		await Book.deleteMany()

		const authors = await Author.insertMany(data.authors)

		// Split the books array into two parts for the two authors
		const booksForFirstAuthor = data.books.slice(0, 3)
		const booksForSecondAuthor = data.books.slice(3)

		// Set the first 3 books for the first author
		await Book.insertMany(booksForFirstAuthor.map(book => ({ ...book, author: authors[0]._id })))

		// Set the next 3 books for the second author
		await Book.insertMany(booksForSecondAuthor.map(book => ({ ...book, author: authors[1]._id })))

		console.log('Data imported successfully.'.green.inverse)
		process.exit(0)
	} catch (error) {
		console.log(`${error}`.red.inverse)
		process.exit(1) // Exit connection with DB
	}
}

const destroyData = async () => {
	try {
		await Author.deleteMany()
		await Book.deleteMany()
		console.log('Data destroyed successfully.'.green.inverse)
		process.exit(0)
	} catch (error) {
		console.log(`${error}`.red.inverse)
		process.exit(1)
	}
}

if (process.argv[2] === '-d') {
	destroyData()
} else {
	importData()
}
