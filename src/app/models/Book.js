const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

BookSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Book', BookSchema)
