const guiasRouter = require('express').Router()
const Guia = require('../models/Guia')
const ErrorResponse = require('../utils/errorResponse')

// Registro de Guia
guiasRouter.post('/', async (req, res, next) => {
  try {
    const time = new Date()
    const newGuia = new Guia({
      nrodeguia: req.body.nrodeguia,
      partida: req.body.partida,
      llegada: req.body.llegada,
      fechainiciotraslado: new Date(),
      fechayhora: time.toLocaleString('es-ES', { timeZone: 'America/Lima', hour12: true, year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      destirazonsocial: req.body.destirazonsocial,
      destiruc: req.body.destiruc,
      destidni: req.body.destidni,
      nroplaca: req.body.nroplaca,
      conductor: req.body.conductor,
      nrolicencia: req.body.nrolicencia,
      transrazonsocial: req.body.transrazonsocial,
      transruc: req.body.transruc,
      materialenviado: req.body.materialenviado,
      materialenviadound: req.body.materialenviadound,
      materialenviadocant: req.body.materialenviadocant
    })
    await newGuia.save()
    res.json('Se registro una nueva Guia').end()
  } catch (err) {
    next(err)
  }
})

guiasRouter.get('/', async (req, res, next) => {
  try {
    const productos = await Guia.find({})
    res.json(productos).end()
  } catch (err) {
    next(err)
  }
})

guiasRouter.get('/guia/:id', async (req, res, next) => {
  const { id } = req.params
  Guia.findById(id)
    .then(producto => {
      if (producto) { return res.json(producto).end() } else { return next(new ErrorResponse('No se pudo encontrar la guia', 404)) }
    })
    .catch(err => {
      next(err)
    })
})

guiasRouter.post('/entrefechas', async (req, res, next) => {
  Guia.find({
    fechainiciotraslado: {
      $gte: req.body.fechadesde, // dia inicio
      $lt: req.body.fechahasta // +1 dia
    }

  }).select('-_id -fechainiciotraslado')
    .then(producto => {
      if (producto) { return res.json(producto).end() } else { return next(new ErrorResponse('No se encontraron guias dentro de este limite', 404)) }
    })
    .catch(err => {
      next(err)
    })
})

guiasRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const deleting = await Guia.findByIdAndDelete(id)
  if (deleting === null) return res.sendStatus(404)
  res.status(204).end()
  console.log('Guia eliminada')
})

//  findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
guiasRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  Guia.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(result => {
    res.json(result).end()
  })
    .catch(next)
})

module.exports = guiasRouter
