const config = require('../config')
const mongoose = require('mongoose')

mongoose.connect(config.db.uri,{})

mongoose.connection.on('error', console.error.bind(console, "Connection error: "))
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB successfully')
})