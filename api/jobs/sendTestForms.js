require("dotenv").config();
const ENV = process.env;
const CreatePostRequest = require("./modules/createPostRequest");
const callRequestInBatches = require("./modules/callRequestInBatches");
const connectToDBAndRun = require("./connectToDBAndRun");
const UserModel = require("../models/user");
const sendGoogleForms = async () => {
  const activeUsers = await UserModel.find({ active: true });
  const allPostRequests = activeUsers.map((user) => {
    // Create the post request to submit the form for each active user.
    return CreatePostRequest("test", user);
  });
  await callRequestInBatches(allPostRequests, 5); // Post the request in batches of 5"
};

connectToDBAndRun(sendGoogleForms);
