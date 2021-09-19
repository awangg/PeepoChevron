const express = require('express')
const router = express.Router()

const { TechService } = require('../handlers')

router.post('/', async (req, res) => {
  try {
    let tec = await TechService.createTech(req.body.tech)
    res.status(200).json(tec)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', async (req, res) => {
  try {
    let authObj = await TechService.login(req.body.name, req.body.password)
    res.status(200).json(authObj)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:techId/:orderId/complete', async (req, res) => {
  try {
    let ord = await TechService.completeWorkOrder(req.params.orderId, req.params.techId)
    res.status(200).json(ord)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router