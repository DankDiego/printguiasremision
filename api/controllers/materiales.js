const materialesRouter = require('express').Router()
const Material = require('../models/Material')

// Registro de placa
materialesRouter.post('/', async (req, res, next) => {
  try {
    const newMaterial = new Material({
      matnombre: req.body.matnombre
    })
    await newMaterial.save()
    res.json('Material creado').end()
  } catch (err) {
    next(err)
  }
})

materialesRouter.get('/', async (req, res, next) => {
  try {
    const materiales = await Material.find({})
    res.json(materiales).end()
  } catch (err) {
    next(err)
  }
})

materialesRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const deleting = await Material.findByIdAndDelete(id)
  if (deleting === null) return res.sendStatus(404)
  res.status(204).end()
  console.log('El material ha sido eliminado')
})

module.exports = materialesRouter
