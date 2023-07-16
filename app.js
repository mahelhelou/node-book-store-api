const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const port = process.env.PORT

const { logger } = require('./middlewares/logger')

const booksAPI = require('./routes/books')
const authorsAPI = require('./routes/authors')
const userAuth = require('./routes/auth')
// const usersAPI = require('./routes/users')

const { notFound, errorHandling } = require('./middlewares/errors')

// Connect to DB
mongoose
	.connect(process.env.CONNECTION_STRING)
	.then(() => console.log('Connected to DB'))
	.catch(error => console.log('Error with connection to DB: ', error))

/**
 * Middlewares
 * express.json() used because express don't understand json, this middleware converts json to javascript object
 */
app.use(express.json())
app.use(logger)

// Routes
app.use('/api/books', booksAPI)
app.use('/api/authors', authorsAPI)
app.use('/api/auth', userAuth)

// Error handler middleware
app.use(notFound)
app.use(errorHandling)

app.listen(port)
