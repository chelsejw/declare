require('dotenv').config()
const UserModel = require('../models/user')
const CreatePostRequest = require('./modules/createPostRequest')
const callRequestInBatches = require('./modules/callRequestInBatches')
const environment = process.env.NODE_ENV

const controller = {
  testJob: () => {
    console.log(`Hi testing`)
  },

  sendGoogleFormForActiveUsers: async () => {
    const activeUsers = await UserModel.find({ active: true })
    const allPostRequests = activeUsers.map((user) => {
      return CreatePostRequest(
        environment === 'production' ? 'student' : 'test',
        user,
      ) // If app is not in production, just use test requests.
    })
    await callRequestInBatches(allPostRequests, 5)
    console.log(`Finished with all tasks!`)
  },
}

module.exports = controller
