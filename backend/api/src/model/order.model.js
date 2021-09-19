const mongoose = require('mongoose')
const Joi = require('joi')
const Schema = mongoose.Schema

const orderSchema = new Schema({
  facility: { type: String, required: true },
  equipment: {
    equipment_type: { type: String, required: true },
    id: { type: String, required: true }
  },
  priority: { type: Number, required: true },
  completion: { type: Number, required: true },
  submission_time: { type: Date, required: true }
})

orderSchema.statics.validateObject = function (model) {
  const expected = Joi.object({
    facility: Joi.string().required(),
    equipment: Joi.object(),
    priority: Joi.number().required(),
    completion: Joi.number().required(),
    submission_time: Joi.date().required()
  })

  return expected.validate(model)
}

module.exports = mongoose.model('WorkOrder', orderSchema)