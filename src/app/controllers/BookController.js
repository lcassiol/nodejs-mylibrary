const Book = require('../models/Book')

class BookController {
  async store (req, res) {
    const book = await Book.create({ ...req.body, createdBy: req.userId })

    return res.json(book)
  }

  async index (req, res) {
    const filters = {
      createdBy: req.userId
    }

    if (req.query.author) {
      filters.author = { $nin: req.author }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const books = await Book.paginate(filters, {
      page: req.query.page || 1,
      limit: parseInt(req.query.size) || 20,
      select: '-createdBy',
      sort: '-createdAt'
    })

    return res.json(books)
  }

  async update (req, res) {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(book)
  }

  async destroy (req, res) {
    await Book.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new BookController()
