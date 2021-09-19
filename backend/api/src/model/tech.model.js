const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const techSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  certifications: [
    { type: String }
  ],
  shift: {
    start: { type: Number, required: true},
    end: { type: Number, required: true }
  },
  current_order: { type: String },
  busy: { type: Boolean, required: true },
  last_location: { type: String }
})

techSchema.pre('save', function (next) {
  let tech = this
  if (!tech.isModified('password')) return next()
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(tech.password, salt, function (err, hash) {
      tech.password = hash
      next()
    })
  })
})

techSchema.methods.comparePassword = async function (otherPassword) {
  let valid = await bcrypt.compare(this.password, otherPassword)
  return valid
}

module.exports = mongoose.model('Tech', techSchema)