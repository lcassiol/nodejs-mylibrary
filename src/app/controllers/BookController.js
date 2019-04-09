const Book = require('../models/Book')

class BookController {
  async store (req, res) {
    const book = await Book.create({ ...req.body, createdBy: req.userId })

    return res.json(book)
  }
}

module.exports = new BookController()
