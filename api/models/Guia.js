const { model, Schema } = require('mongoose')

const guiaSchema = new Schema({
  nrodeguia: {
    type: String,
    required: [true, 'Por favor ingrese el Numero de Guia']
  },
  partida: {
    type: String,
    required: [true, 'Por favor ingrese el punto de partida']
  },
  llegada: {
    type: String,
    required: [true, 'Por favor ingrese el punto de llegada']
  },
  fechainiciotraslado: {
    type: Date
  },
  fechayhora: {
    type: String
  },
  destirazonsocial: {
    type: String,
    required: [true, 'Por favor ingrese Nombre o razon social de destino']
  },
  destiruc: {
    type: String,
    required: [true, 'Por favor ingrese el ruc del destino']
  },
  destidni: {
    type: String
  },
  nroplaca: {
    type: String,
    required: [true, 'Por favor ingrese la fecha de Inicio de traslado']
  },
  conductor: {
    type: String,
    required: [true, 'Por favor ingrese la placa']
  },
  nrolicencia: {
    type: String,
    required: [true, 'Por favor ingrese numero de licencia de conducir']
  },
  transrazonsocial: {
    type: String,
    required: [true, 'Por favor ingrese nombre o razon social del transportista']
  },
  transruc: {
    type: String,
    required: [true, 'Por favor ingrese RUC de transportista']
  },

  materialenviado: {
    type: String,
    required: [true, 'Por favor Material enviado']
  },

  materialenviadocant: {
    type: String
  },

  materialenviadound: {
    type: String,
    required: [true, 'Por favor Material enviado']
  }
})

guiaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Guia = model('Guia', guiaSchema)
module.exports = Guia
