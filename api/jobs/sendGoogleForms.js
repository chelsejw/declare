require('dotenv').config()
const { SCHEDULED_DAY } = process.env

const CreatePostRequest = require('./modules/createPostRequest')
const callRequestInBatches = require('./modules/callRequestInBatches')
const connectToDBAndRun = require('./modules/connectToDBAndRun')
const UserModel = require('../models/user')
const dayOfWeekAsString = require('./modules/dayOfWeekAsString')

const sendGoogleForms = async () => {
  const dayOfWeekIndex = new Date().getDay().toString()
  const currentDay = dayOfWeekAsString(dayOfWeekIndex)
  const scheduledDay = dayOfWeekAsString(SCHEDULED_DAY)
  console.log(`Today is ${currentDay}.`)

  let usersToSend

  if (currentDay == scheduledDay) {
    // If it's the scheduled day, we send it for users who have no configured send_day, or whose send_day is the scheduled day.
    usersToSend = await UserModel.find({
      active: true,
      send_day: { $in: ['', scheduledDay] },
    })
  } else {
    // If it's a non-scheduled day, we send it for users who have customised their send_day to the current day.
    usersToSend = await UserModel.find({
      active: true,
      send_day: currentDay,
    })
  }

  const allPostRequests = usersToSend.map((user) => {
    // Create the post request to submit the form for each active user.
    return CreatePostRequest(
      user.user_type, // Should be "team" or "student", determines which form will be sent
      user,
    ) // If app is not in production, just use test requests
  })
  await callRequestInBatches(allPostRequests, 5) // Post the request in batches of 5"
}

connectToDBAndRun(sendGoogleForms)
