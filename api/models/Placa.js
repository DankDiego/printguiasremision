const { model, Schema } = require('mongoose')

const placaSchema = new Schema({
  placanro: {
    type: String,
    required: [true, 'Por favor ingrese la Placa']
  },
  capacidad: {
    type: String,
    required: [true, 'Por favor ingrese la capacidad']
  },
  undmedida: {
    type: String,
    required: [true, 'Por favor ingrese la unidad de medida']
  },
  conductor: {
    type: String,
    required: [true, 'Por favor ingrese el nombre del Conductor asociado a esta placa']
  },
  conductorlic: {
    type: String,
    required: [true, 'Por favor ingrese la licencia de el Conductor asociado a esta placa']
  }
})

placaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Placa = model('Placa', placaSchema)
module.exports = Placa
