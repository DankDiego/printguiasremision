const crypto = require('crypto')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Por favor ingrese un usuario']
  },
  email: {
    type: String,
    required: [true, 'Por favor ingrese un correo electronico'],
    unique: [true, 'Ya existe alguien registrado con este email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Por favor ingrese un correo valido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Por favor ingrese una contraseña'],
    minlength: [6, 'Por favor ingrese una contraseña mayor a 6 caracteres'],
    select: false
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

//  Metodo que hashea el password antes de guardarla
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//  Metodo que compara la password y la passwordHash de la BD, devuelve true o false
UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

//  Metodo para generar token jwt para reinicio de contraseña
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id, nombre: this.username, correo: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

//  Metodo para obtener un token, que acredita el cambio de contraseña
UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000) // Ten Minutes
  //  devolvemos el token
  return resetToken
}

const User = mongoose.model('User', UserSchema)

module.exports = User
