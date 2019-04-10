const User = require('../models/User')
const BookController = require('../controllers/BookController')

class UserController {
  async store (req, res) {
    const { email } = req.body

    if (await User.findOne({ email })) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const user = await User.create(req.body)
    user.password = undefined

    return res.json(user)
  }

  async index (req, res) {
    const filters = {}

    if (req.query.name) {
      filters.name = new RegExp(req.query.name, 'i')
    }

    if (req.query.email) {
      filters.email = new RegExp(req.query.email, 'i')
    }

    const users = await User.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.size) || 20,
      select: '-password',
      sort: '-createdAt'
    })

    return res.json(users)
  }

  async update (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(user)
  }

  async destroy (req, res) {
    const userId = req.params.id

    await User.findByIdAndDelete(userId)
    await BookController.deleteUserbooks(userId)

    return res.send()
  }
}

module.exports = new UserController()
