const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.status(200).send('KEKW')
})

router.use('/facility', require('./facility.controller'))
router.use('/tech', require('./tech.controller'))

module.exports = router