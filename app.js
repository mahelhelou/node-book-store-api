const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT

const booksAPI = require('./routes/books')
const authorsAPI = require('./routes/authors')

// Connect to DB
mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => console.log('Connected do DB'))
	.catch(error => console.log('Error with connection to DB: ', error))

/**
 * Middlewares
 * express.json() used because express don't understand json, this middleware converts json to javascript object
 */
app.use(express.json())

// Routes
app.use('/api/books', booksAPI)
app.use('/api/authors', authorsAPI)

app.listen(port)
