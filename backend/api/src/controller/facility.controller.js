const express = require('express')
const { verifyAuth, checkIsFacility } = require('../utils/auth')
const router = express.Router()

const { FacilityService } = require('../handlers')

router.get('/login', async (req, res) => {
  try {
    let authObj = await FacilityService.login(req.body.name, req.body.password)
    res.status(200).json(authObj)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    let fac = FacilityService.createFacility(req.body.facility)
    res.status(200).json(fac)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:facilityId', verifyAuth, checkIsFacility, async (req, res) => {
  try {
    let fac = await FacilityService.getFacilityById(req.params.facilityId)
    res.status(200).json(fac)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/:facilityId', verifyAuth, checkIsFacility, async (req, res) => {
  try {
    let fac = await FacilityService.addWorkOrder(req.params.facilityId, req.body.workOrder)
    res.status(200).json(fac)
  } catch (err) {
    console.log(err)
  }
})

router.get('/:facilityId/orders', verifyAuth, checkIsFacility, async (req, res) => {
  try {
    let fac = await FacilityService.getWorkOrdersForFacility(req.params.facilityId)
    res.status(200).json(fac)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router