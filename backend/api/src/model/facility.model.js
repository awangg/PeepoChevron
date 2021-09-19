const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const facilitySchema = new Schema({
  facility: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location:{
    lat: { type: Number, required: true },
    long: { type: Number, required: true }
  },
  current_occupancy: { type: Number, required: true },
  max_occupancy: { type: Number, required: true },
  equipment: [{
    equipment_type: { type: String },
    quantity: { type: Number }
  }],
  work_orders: [{
    type: String
  }]
})

facilitySchema.pre('save', function (next) {
  let facility = this
  if (!facility.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(facility.password, salt, function (err, hash) {
      facility.password = hash
      next()
    })
  })
})

facilitySchema.methods.comparePassword = async function (otherPassword) {
  let valid = await bcrypt.compare(this.password, otherPassword)
  return valid
}

module.exports = mongoose.model('Facility', facilitySchema)