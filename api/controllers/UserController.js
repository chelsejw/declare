require('dotenv').config()
const { SCHEDULED_DAY, SCHEDULED_TIME_IN_HOURS } = process.env
const User = require('../models/user')
const argon2 = require('argon2')
const dayOfWeekAsString = require('../jobs/modules/dayOfWeekAsString')
const errorHandler = (res, errData, message) => {
  let response = {}
  console.error(errData)
  response.message = message
  res.status(500)
  response.error = true
  res.json(response)
}

const setResponse = (res, errorExists, message, userData, existsField) => {
  let response = {}
  response.error = errorExists
  response.message = message
  if (userData) {
    response.user = userData
  }
  if (existsField) {
    // This is only for checkIfUserExists route
    response.exists = existsField
  }
  res.json(response)
}

const controllers = {
  register: async (req, res) => {
    // Check if user exists.
    const { email, password } = req.body
    if (await User.findOne({ email })) {
      setResponse(res, true, 'Email is already in use.')
      return
    }

    let argon2Hash

    try {
      argon2Hash = await argon2.hash(password)
    } catch (err) {
      errorHandler(res, err, 'There was an unexpected system error.')
    }

    try {
      const newUser = await User.create({ ...req.body, password: argon2Hash })

      console.log(newUser)

      let {
        ga_email,
        full_name,
        active,
        mobile,
        last_declared,
        cohort,
        user_type,
        send_day,
      } = newUser
      let userDataToSend = {
        ga_email,
        full_name,
        active,
        mobile,
        email: newUser.email,
        last_declared,
        cohort,
        user_type,
        send_day,
      }
      setResponse(res, false, 'User was created successfully.', userDataToSend)
    } catch (err) {
      errorHandler(res, err, 'There was an unexpected system error.')
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      setResponse(res, true, 'No user with that email found.')
    }
    try {
      const passwordVerified = await argon2.verify(user.password, password)
      if (passwordVerified) {
        let {
          ga_email,
          full_name,
          active,
          mobile,
          last_declared,
          cohort,
          user_type,
          send_day,
        } = user
        setResponse(res, false, 'Login successful.', {
          email: user.email,
          ga_email,
          full_name,
          active,
          mobile,
          last_declared,
          cohort,
          user_type,
          send_day,
        })
      } else {
        setResponse(res, true, 'Password is incorrect.')
      }
    } catch (err) {
      errorHandler(res, err, 'There was an unexpected system error.')
    }
  },

  checkIfUserExists: async (req, res) => {
    const { email } = req.body
    try {
      if (await User.findOne({ email })) {
        setResponse(res, false, 'This user exists.', null, true)
        return
      } else {
        setResponse(res, false, 'The user does not exist.', null, false)
      }
    } catch (err) {
      errorHandler(res, err, 'There was an unexpected system error.')
    }
  },

  updateUser: async (req, res) => {
    let {
      email,
      ga_email,
      full_name,
      active,
      mobile,
      cohort,
      user_type,
      send_day,
    } = req.body
    User.updateOne(
      { email },
      { ga_email, full_name, active, mobile, cohort, user_type, send_day },
      { new: true }, // returns the updated document
    )
      .then((updatedUser) => {
        let userDataToSend = {
          email: updatedUser.email,
          ga_email: updatedUser.ga_email,
          full_name: updatedUser.full_name,
          active: updatedUser.active,
          mobile: updatedUser.mobile,
          last_declared: updatedUser.last_declared,
          cohort: updatedUser.cohort,
          user_type: updatedUser.user_type,
          send_day: updatedUser.send_day,
        }
        setResponse(res, false, 'Update was successful.', userDataToSend)
      })
      .catch((err) => {
        errorHandler(res, err, 'There was an unexpected system error.')
      })
  },

  getScheduledTime: (_, res) => {
    // let cronTime = process.env.SCHEDULED_TIME_TO_RUN.split(" ");
    let hour = SCHEDULED_TIME_IN_HOURS
    if (hour.toString().length < 2) {
      hour = '0' + hour
    }
    const day = dayOfWeekAsString(SCHEDULED_DAY) // day of the week is the fifth number in the cron string
    res.send(`${day}`)
  },
}

module.exports = controllers
