const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')
const { promisify } = require('util')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret)

    req.userId = decoded.id

    const user = await User.findOne({ _id: req.userId })

    if (!user) {
      return res
        .status(400)
        .json({ error: "You don't have power here anymore" })
    }

    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' })
  }
}
