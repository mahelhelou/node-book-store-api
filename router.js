const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')
const bookController = require('./controllers/bookController')

// User related routes
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/forgot-password', userController.forgotPassword)

// Book related routes
router.post('/books', bookController.create)
router.get('/books', bookController.bookList)
router.get('/books/:id', bookController.bookById)
router.put('/books/:id', bookController.update)
router.delete('/books/:id', bookController.delete)

// Author related routes
router.post('/authors', authorController.create)
router.get('/authors', authorController.authorList)
router.get('/authors/v2', authorController.authorList2)
router.get('/authors/:id', authorController.authorById)
router.put('/authors/:id', authorController.update)
router.delete('/authors/:id', authorController.delete)

module.exports = router
