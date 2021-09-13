// conexion con Mongo
require('dotenv').config()
const mongoose = require('mongoose')
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false

  })

  console.log('MongoDB Conectado')
}

module.exports = connectDB
