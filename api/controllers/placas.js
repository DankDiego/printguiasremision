const placasRouter = require('express').Router()
const Placa = require('../models/Placa')
const ErrorResponse = require('../utils/errorResponse')

// Registro de placa
placasRouter.post('/', async (req, res, next) => {
  try {
    const newPlaca = new Placa({
      placanro: req.body.placanro,
      capacidad: req.body.capacidad,
      undmedida: req.body.undmedida,
      conductor: req.body.conductor,
      conductorlic: req.body.conductorlic
    })
    await newPlaca.save()
    res.json('Placa registrada').end()
  } catch (err) {
    next(err)
  }
})

placasRouter.get('/', async (req, res, next) => {
  try {
    const placas = await Placa.find({})
    res.json(placas).end()
  } catch (err) {
    next(err)
  }
})
placasRouter.get('/tn', async (req, res, next) => {
  try {
    const placas = await Placa.find({ undmedida: 'tn' })
    res.json(placas).end()
  } catch (err) {
    next(err)
  }
})
placasRouter.get('/mc', async (req, res, next) => {
  try {
    const placas = await Placa.find({ undmedida: 'm3' })
    res.json(placas).end()
  } catch (err) {
    next(err)
  }
})
placasRouter.get('/:id', async (req, res, next) => {
  const { id } = req.params
  Placa.findById(id)
    .then(placa => {
      if (placa) { return res.json(placa).end() } else { return next(new ErrorResponse('No se pudo encontrar la placa', 404)) }
    })
    .catch(err => {
      next(err)
    })
})

placasRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const deleting = await Placa.findByIdAndDelete(id)
  if (deleting === null) return res.sendStatus(404)
  res.status(204).end()
  console.log('La placa ha sido eliminada')
})

//  findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
placasRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params
  Placa.findOneAndUpdate({ _id: id }, { $set: req.body }, { new: true }).then(result => {
    res.json(result).end()
  })
    .catch(next)
})

module.exports = placasRouter
