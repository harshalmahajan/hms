import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const PatientSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Please provide first name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lname: {
    type: String,
    required: [true, 'Please provide last name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    select: false,
  },
  contact: {
    type: Number,
    required: [true, 'Please provide contact number'],
    minlength: 10,
    maxlength: 10
  },

  gender: {
    type: String,
    enum: ['Male', 'Female'],
    // default: 'nothing',
  },

})

PatientSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

PatientSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

PatientSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('Patient', PatientSchema)
