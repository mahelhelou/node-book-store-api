const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const authorController = require('./controllers/authorController')

// User related routes
router.post('/register', userController.register)
router.post('/login', userController.login)

// Book related routes

// Author related routes
router.post('/authors', authorController.create)
router.get('/authors', authorController.list)
router.get('/authors/v2', authorController.list2)
router.put('/authors/:id', authorController.update)
router.delete('/authors/:id', authorController.delete)
