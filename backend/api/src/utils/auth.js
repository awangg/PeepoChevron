const config = require('../../config')
const moment = require('moment')
const jwt = require('jwt-simple')

const { Facility, Tech } = require('../model')

const verifyAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ error: 'Token Missing' })
  let token = req.headers.authorization.split(' ')[1]

  let payload = null
  try {
    payload = jwt.decode(token, config.auth.secret)
  } catch (err) {
    return res.status(401).json({ error: 'Invalid Token' })
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).json({ error: 'Token Expired' })
  }

  // Facility Access
  if (payload.access == 1) {
    console.log('e')
    let fac = Facility.findById({ _id: payload.id })
    if (!fac) res.status(404).json({ error: 'Facility Not Found '})
    if (fac.facility == payload.facility)
      next()
  } else if (payload.access == 2) {
    let tec = Tech.findById({ _id: payload.id })
    if (!tec) res.status(404).json({ error: 'Facility Not Found '})
    if (tec.name == payload.name)
      next()
  }
}

const checkIsFacility = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1]
    let payload = jwt.decode(token, config.auth.secret)

    if (payload.access == 1) next()
    else res.status(401).json({ error: 'Not A Facility' })
  }
}

const checkIsTech = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1]
    let payload = jwt.decode(token, config.auth.secret)

    if (payload.access == 2) next()
    else res.status(401).json({ error: 'Not A Technician' })
  }
}

module.exports = {
  verifyAuth: verifyAuth,
  checkIsFacility: checkIsFacility,
  checkIsTech: checkIsTech
}