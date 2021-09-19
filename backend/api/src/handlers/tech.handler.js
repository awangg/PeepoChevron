const config = require('../../config')
const axios = require('axios')
const jwt = require('jwt-simple')
const moment = require('moment')

const { Facility, Order, Tech } = require('../model')
const { sendAssignment } = require('../utils/sms')

const createTech = async (techSchema) => {
  let tec = await new Tech(techSchema).save()
  return tec
}

const login = async (name, password) => {
  let tec = await Tech.findOne({ name: name })
  if (!tec) throw new Error('User Not Found')

  let authorized = tec.comparePassword(password)
  if (authorized) {
    let payload = {
      exp: moment.unix(moment().add('24', 'h')),
      sub: tec._id,
      access: 2
    }

    if (tec.current_order.length < 4) assignWorkOrder(tec._id)

    return {
      name: tec.name,
      id: tec._id,
      access: 2,
      token: jwt.encode(payload, config.auth.secret)
    }
  } else {
    throw new Error('Incorrect Password')
  }
}

const completeWorkOrder = async (orderId, techId) => {
  let ord = await Order.findByIdAndDelete({ _id: orderId })
  if (!ord) throw new Error('Order Not Found')
  
  let fac = await Facility.updateOne({ facility: ord.facility }, { $pullAll: { work_orders: [orderId] } })
  if (!fac) throw new Error('Associated Facility Not Found')
  fac = await Facility.updateOne({ facility: ord.facility }, { $inc: { current_occupancy: -1 } })
  let tec = await Tech.findByIdAndUpdate({ _id: techId }, { busy: false, current_order: "", last_location: ord.facility })
  if (!tec) throw new Error('Associated Tech Not Found')

  return assignWorkOrder(techId)
}

const assignWorkOrder = async (techId) => {
  let tec = await Tech.findById({ _id: techId })
  let allOrders = await Order.find({})
  let allFacs = await Facility.find({})

  const response = await axios.post('http://127.0.0.1:5000/api/v1/assign', {
    data: {
      technician: tec,
      orders: allOrders,
      facilities: allFacs
    }
  })

  await Facility.updateOne({ facility: response.data.facility }, { $inc: { current_occupancy: 1 } })
  await Tech.findByIdAndUpdate({ _id: techId }, { current_order: response.data._id })

  sendAssignment(response.data)

  return response.data
}

const getTechById = async (techId) => {
  let tec = await Tech.findById({ _id: techId })
  return tec
}

const getCurrentWorkOrder = async (techId) => {
  let tec = await Tech.findById({ _id: techId })
  if (!tec) throw new Error('Technician Not Found')

  if (tec.current_order.length < 4)
    return {}
  else {
    let ord = await Order.findById({ _id: tec.current_order })
    if (!ord) throw new Error('Order Not Found')

    let fac = await Facility.findOne({ facility: ord.facility })
    if (!fac) throw new Error('Facility Not Found')

    return {
      location: {
        lat: fac.location.lat,
        long: fac.location.long
      },
      details: ord
    }
  }
}

module.exports = {
  login: login,
  completeWorkOrder: completeWorkOrder,
  assignWorkOrder: assignWorkOrder,
  createTech: createTech,
  getTechById: getTechById,
  getCurrentWorkOrder: getCurrentWorkOrder
}