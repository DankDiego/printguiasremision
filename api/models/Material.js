const { model, Schema } = require('mongoose')

const materialSchema = new Schema({
  matnombre: {
    type: String,
    required: [true, 'Por favor ingrese nombre del Material']
  }
})

materialSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Material = model('Material', materialSchema)
module.exports = Material
