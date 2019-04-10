const Joi = require('joi')

module.exports = {
  body: {
    title: Joi.string().required(),
    author: Joi.string().required()
  }
}
