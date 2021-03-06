const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    return next(new ErrorResponse('Acceso restringido', 401))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id)

    if (!user) {
      return next(new ErrorResponse('No se encontro al usuario', 404))
    }

    req.user = user

    next()
  } catch (err) {
    return next(new ErrorResponse('No tienes permitido el acceso a esta ruta, sucio', 401))
  }
}
