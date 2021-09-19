const config = require('../../config')
const jwt = require('jwt-simple')
const moment = require('moment')

const { Facility, Order } = require('../model')

const createFacility = async (facilitySchema) => {
  let fac = new Facility(facilitySchema)
  return fac.save()
}

const login = async (name, password) => {
  let fac = await Facility.findOne({ facility: name })
  if (!fac) throw new Error('User Not Found')

  let authorized = fac.comparePassword(password)
  if (authorized) {
    let payload = {
      exp: moment.unix(moment().add('24', 'h')),
      sub: fac._id,
      access: 1
    }

    return {
      facility: fac.facility,
      id: fac._id,
      access: 1,
      token: jwt.encode(payload, config.auth.secret)
    }
  } else {
    throw new Error('Incorrect Password')
  }
}

const getFacilityById = async (facilityId) => {
  let fac = await Facility.findById({ _id: facilityId })
  if (!fac) return new Error('Facility Not Found')
  return fac
}

const addWorkOrder = async (facilityId, workOrderSchema) => {
  const { error, value } = Order.validateObject(workOrderSchema)
  if (error) throw error
  let order = await new Order(value).save()

  let fac = await Facility.findByIdAndUpdate({ _id: facilityId }, { $push: { work_orders: order._id }})
  if (!fac) throw new Error('Facility Not Found')
  return order
}

const getWorkOrdersForFacility = async (facilityId) => {
  let fac = await Facility.findById({ _id: facilityId })
  if (!fac) return new Error('Facility Not Found')

  let orderList = []
  let facOrders = fac.work_orders;
  for (const order of facOrders) {
    let orderObj = await Order.findById({ _id: order })
    orderList.push(orderObj)
  }

  return orderList
}

module.exports = {
  createFacility: createFacility,
  login: login,
  getFacilityById: getFacilityById,
  addWorkOrder: addWorkOrder,
  getWorkOrdersForFacility: getWorkOrdersForFacility
}