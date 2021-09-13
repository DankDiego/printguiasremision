require('dotenv').config()
const cors = require('cors')
const path = require('path')
const rutamonorepo = path.join(__dirname, '..', 'app/build')
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
// Conectado rutas
const guiasRouter = require('./controllers/guias')
const placasRouter = require('./controllers/placas')
const materialesRouter = require('./controllers/materiales')
//   Usamos Cors y Json
app.use(cors())
app.use(express.static(path.join(rutamonorepo)))
app.use(express.json())
// Llamamos a la funcion que conecta la BD
connectDB()
// Conectando rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/private', require('./routes/private'))
app.use('/api/guias', guiasRouter)
app.use('/api/materiales', materialesRouter)
app.use('/api/placas', placasRouter)
app.get('*', (req, res) => {
  res.sendFile(path.join(rutamonorepo + '/index.html'))
})
// Manejador de Errores Middleware
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () =>
  console.log(`Sever corriendo en el puerto: ${PORT}`)
)

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`)
  server.close(() => process.exit(1))
})
