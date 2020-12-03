const CreatePostRequest = require("./modules/createPostRequest");
const callRequestInBatches = require("./modules/callRequestInBatches");
const connectToDBAndRun = require("./connectToDBAndRun");
const UserModel = require("../models/user");
const moment = require("moment");

function getFormattedDate() {
  var date = new Date();
  var str =
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    ", " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  return str;
}

const sendGoogleForms = async () => {
  console.log(`The date and time is`, getFormattedDate());
  const activeUsers = await UserModel.find({ active: true });
  const allPostRequests = activeUsers.map((user) => {
    // Create the post request to submit the form for each active user.
    return CreatePostRequest("test", user);
  });
  await callRequestInBatches(allPostRequests, 5); // Post the request in batches of 5"
};

connectToDBAndRun(sendGoogleForms);
