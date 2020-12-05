require("dotenv").config();
const ENV = process.env;
const CreatePostRequest = require("./modules/createPostRequest");
const callRequestInBatches = require("./modules/callRequestInBatches");
const connectToDBAndRun = require("./connectToDBAndRun");
const UserModel = require("../models/user");
const ENVIRONMENT = ENV.NODE_ENV;
const SCHEDULED_DAY = ENV.SCHEDULED_DAY;
const dayOfWeekAsString = require("./modules/dayOfWeekAsString");

const sendGoogleForms = async () => {
  const dayOfWeekAsIndex = new Date().getDay().toString();
  console.log(
    `The app should run tasks every ${dayOfWeekAsString(SCHEDULED_DAY)}.`
  );
  console.log(`Today is ${dayOfWeekAsString(dayOfWeekAsIndex)}.`);
  if (dayOfWeekAsIndex !== SCHEDULED_DAY) {
    console.log(`We are not scheduled to send a form today.`);
    return;
  }
  const activeUsers = await UserModel.find({ active: true });
  const allPostRequests = activeUsers.map((user) => {
    // Create the post request to submit the form for each active user.
    return CreatePostRequest(
      user.type, // Should be "team" or "student"
      user
    ); // If app is not in production, just use test requests
  });
  await callRequestInBatches(allPostRequests, 5); // Post the request in batches of 5"
};

connectToDBAndRun(sendGoogleForms);