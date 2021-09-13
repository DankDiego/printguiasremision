const { model, Schema } = require('mongoose')

const placaSchema = new Schema({
  matnombre: {
    type: String,
    required: [true, 'Por favor ingrese nombre del Material']
  }
})

placaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Material = model('Material', placaSchema)
module.exports = Material
