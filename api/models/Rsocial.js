const { model, Schema } = require('mongoose')

const rsocialSchema = new Schema({
  rzsocial: {
    type: String,
    required: [true, 'Por favor ingrese nombre o razon social']
  },
  rzruc: {
    type: String,
    required: [true, 'Por favor ingrese el ruc']
  }
})

rsocialSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Rsocial = model('Rsocial', rsocialSchema)
module.exports = Rsocial
