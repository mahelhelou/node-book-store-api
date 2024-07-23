const express = require('express')
const router = require('./router')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(express.urlencoded({ extended: false })) // accept data from client (browser)
app.use(express.json()) // accept data from client (JSON format)

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use('/api', router)

// Errors handler
app.use(errorHandler.notFound)
app.use(errorHandler.error) // Handle errors of routes ~ Tell server to return JSON even if there's an error

module.exports = app
