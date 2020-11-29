const UserModel = require("../models/user");
const CreatePostRequest = require('./modules/CreatePostRequest')
const callRequestInBatches = async (arrayOfPromises, batchSize) => {
  console.log(`Starting to execute`);
  let batchNum = 0;
  while (arrayOfPromises.length > 0) {
    batchNum++;
    console.log(`Starting on batch number ${batchNum}`);
    const batch = arrayOfPromises.splice(0, batchSize);
    await Promise.all(batch);
    console.log(`Resolved batch ${batchNum}`);
  }
};

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
