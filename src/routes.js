const express = require('express')
const handle = require('express-async-handler')
const validate = require('express-validation')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
routes.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

routes.use(authMiddleware)

/**
 * Books
 */

routes.get('/books', handle(controllers.BookController.index))
routes.post(
  '/books',
  validate(validators.Book),
  handle(controllers.BookController.store)
)
routes.put(
  '/books/:id',
  validate(validators.Book),
  handle(controllers.BookController.update)
)
routes.delete('/books/:id', handle(controllers.BookController.destroy))

/**
 * User
 */

routes.get('/users', handle(controllers.UserController.index))
routes.put('/users/:id', handle(controllers.UserController.update))
routes.delete('/users/:id', handle(controllers.UserController.destroy))

module.exports = routes
