const express = require('express')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')

routes.post('/users', handle(controllers.UserController.store))
routes.post('/sessions', handle(controllers.SessionController.store))

routes.use(authMiddleware)

routes.post('/books', handle(controllers.BookController.store))

module.exports = routes
