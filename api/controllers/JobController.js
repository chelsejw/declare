const UserModel = require("../models/user");
const CreatePostRequest = require('./modules/createPostRequest')
const callRequestInBatches = require('./modules/callRequestInBatches')

const controller = {
  testJob: () => {
    console.log(`Hi testing`);
  },

  sendGoogleFormForActiveUsers: async () => {
    const activeUsers = await UserModel.find( { active: true} );
    const allPostRequests = activeUsers.map((user) => {
      return CreatePostRequest('test', user);
    });
    await callRequestInBatches(allPostRequests, 5);
    console.log(`Finished with all tasks!`)
  },
};

module.exports = controller;
