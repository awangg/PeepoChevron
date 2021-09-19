const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const moment = require('moment')
const cors = require('cors')

const mongo = require('./mongo')
const routes = require('../src/controller')

moment().format()

const run = (port) => {
  const app = express()
  const server = http.createServer(app)

  app.use(cors())
  app.use(bodyParser.json())
  app.use('/api/v1', routes)

  server.listen(port, () => {
    console.log('Listening on http://localhost:' + port)
  })
}

module.exports = run