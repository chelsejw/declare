require('dotenv').config()
const { SCHEDULED_DAY } = process.env

const CreatePostRequest = require('./modules/createPostRequest')
const callRequestInBatches = require('./modules/callRequestInBatches')
const connectToDBAndRun = require('./modules/connectToDBAndRun')
const UserModel = require('../models/user')
// const ENVIRONMENT = ENV.NODE_ENV;
const dayOfWeekAsString = require('./modules/dayOfWeekAsString')

const sendGoogleForms = async () => {
  const dayOfWeekAsIndex = new Date().getDay().toString()
  const currentDayString = dayOfWeekAsString(dayOfWeekAsIndex);
  console.log(`Today is ${dayOfWeekAsString(dayOfWeekAsIndex)}.`)
  const activeUsers = await UserModel.find({ active: true, send_day: currentDayString })
  const allPostRequests = activeUsers.map((user) => {
    // Create the post request to submit the form for each active user.
    return CreatePostRequest(
      user.user_type, // Should be "team" or "student", determines which form will be sent
      user,
    ) // If app is not in production, just use test requests
  })
  await callRequestInBatches(allPostRequests, 5) // Post the request in batches of 5"
}

connectToDBAndRun(sendGoogleForms)
