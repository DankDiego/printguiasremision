const crypto = require('crypto')
const ErrorResponse = require('../utils/errorResponse')
const User = require('../models/User')
const sendEmail = require('../utils/sendEmail')

//  Login de usuario
exports.login = async (req, res, next) => {
  const { email, password } = req.body

  // Chequeamos el correo y contraseña
  if (!email || !password) {
    return next(new ErrorResponse('Por favor ingrese su email y password', 400))
  }

  try {
    // Chequeamos si existe el usuario (email es unico no se repite)
    const user = await User.findOne({ email }).select('+password')

    if (!user) {
      return next(new ErrorResponse('Email o Password invalidos', 401))
    }

    // Chequeamos que la contraseña coincida la funcion esta en el modelo User
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Email o Password invalidos', 401))
    }

    sendToken(user, 200, res)
  } catch (err) {
    next(err)
  }
}

// Registro de usuario
exports.register = async (req, res, next) => {
  const { username, email, password } = req.body

  try {
    const user = await User.create({
      username,
      email,
      password
    })

    sendToken(user, 200, res)
  } catch (err) {
    next(err)
  }
}

// Olvide mi contraseña
exports.forgotPassword = async (req, res, next) => {
  // Enviamos un correo, luego de chequear si el usuario existe
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return next(new ErrorResponse('No se pudo enviar el mensaje, intente mas tarde', 404))
    }

    //  Token de reseteo es generado y guardado en la BD (hasheado y privado) el metodo esta en el modelo
    const resetToken = user.getResetPasswordToken()

    await user.save()

    // Generamos la url de reseteo para enviarla por email
    /*  const resetUrl = `http://localhost:5000/${resetToken}` */
    const RESETPASSURL = `${process.env.RESETPASSURLTOKEN}/passwordreset/${resetToken}`
    // Mensaje HTML
    const message = `
    <h1>Has solicitado un cambio de contraseña</h1>
    <img src="https://res.cloudinary.com/dsulcam/image/upload/v1624771581/passforgot_yiokwf.png" width="320" height="320">
    <p>Por favor has click al siguiente link o copia y pega el enlace:</p>
    <a href=${RESETPASSURL} clicktracking=off>${RESETPASSURL}</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Cambio de Contraseña',
        text: message
      })

      res.status(200).json({ success: true, data: 'Email enviado' })
    } catch (err) {
      user.resetPasswordToken = undefined
      user.resetPasswordExpire = undefined

      await user.save()

      return next(new ErrorResponse('No se pudo enviar el email', 500))
    }
  } catch (err) {
    next(err)
  }
}

// Reseteamos la contraseña
exports.resetPassword = async (req, res, next) => {
  //  Comparamos el token enviado por URL con el token Hasheado de la BD
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
      return next(new ErrorResponse('Token invalido', 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    res.status(201).json({
      success: true,
      data: 'Contraseña cambiada correctamente',
      token: user.getSignedJwtToken()
    })
  } catch (err) {
    next(err)
  }
}

//  Enviamos token (esta ruta no se exporta)
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  res.status(statusCode).json({ sucess: true, email: user.email, nombre: user.username, token })
}
