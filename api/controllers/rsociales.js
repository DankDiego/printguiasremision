const rsocialesRouter = require('express').Router()
const Rsocial = require('../models/Rsocial')

// Registro de R-Social
rsocialesRouter.post('/', async (req, res, next) => {
  try {
    const newRsocial = new Rsocial({
      rzsocial: req.body.rzsocial,
      rzruc: req.body.rzruc
    })
    await newRsocial.save()
    res.json('Razon Social Registrada').end()
  } catch (err) {
    next(err)
  }
})

rsocialesRouter.get('/', async (req, res, next) => {
  try {
    const rsociales = await Rsocial.find({})
    res.json(rsociales).end()
  } catch (err) {
    next(err)
  }
})

rsocialesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const deleting = await Rsocial.findByIdAndDelete(id)
  if (deleting === null) return res.sendStatus(404)
  res.status(204).end()
})

module.exports = rsocialesRouter
