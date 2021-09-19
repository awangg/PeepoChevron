const config = require('../../config')
const jwt = require('jwt-simple')
const moment = require('moment')

const { Facility, Order, Tech } = require('../model')

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

    if (!tec.busy) assignWorkOrder(tec._id)

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
  // TODO remove later
  let ord = await Order.findByIdAndDelete({ _id: orderId })
  if (!ord) throw new Error('Order Not Found')
  
  let fac = await Facility.updateOne({ facility: ord.facility }, { $pullAll: { work_orders: [orderId] } })
  if (!fac) throw new Error('Associated Facility Not Found')
  fac = await Facility.updateOne({ facility: ord.facility }, { $inc: { current_occupancy: -1 } })
  let tec = await Tech.findByIdAndUpdate({ _id: techId }, { busy: false, current_order: "" })
  if (!tec) throw new Error('Associated Tech Not Found')

  assignWorkOrder(techId)

  return ord;
}

const assignWorkOrder = async (techId) => {
  console.log('Assume we assigned a work order')
  /*
  let ord = await Order.findByIdAndDelete({ _id: orderId })
  if (!ord) throw new Error('Order Not Found')
  */
}

module.exports = {
  login: login,
  completeWorkOrder: completeWorkOrder,
  assignWorkOrder: assignWorkOrder,
  createTech: createTech
}