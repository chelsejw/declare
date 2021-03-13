const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ga_email: { type: String, required: true },
  active: { type: Boolean, default: true }, // determines if server will automatically send requests,
  mobile: { type: String, required: true },
  cohort: { type: String, default: '' },
  user_type: { type: String, enum: ['student', 'team'], required: true },
  last_declared: Date,
  password: { type: String, required: true },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  send_day: {
    type: String,
    enum: [
      '',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    default: '',
  },
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
