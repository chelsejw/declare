require("dotenv").config();
const ENV = process.env;
const mongoose = require("mongoose");
const localMongo = `mongodb://localhost:27017/${ENV.DB_NAME}`;
const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}`;
let DB_TYPE = ENV.DB_TYPE;
const UserModel = require("../models/user");
const CreatePostRequest = require("./modules/createPostRequest");
const callRequestInBatches = require("./modules/callRequestInBatches");
const ENVIRONMENT = ENV.NODE_ENV;
const SCHEDULED_DAY = ENV.SCHEDULED_DAY;

function dayOfWeekAsString(dayIndex) {
  return (
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][dayIndex] || ""
  );
}

(async () => {
  const dayOfWeekAsIndex = new Date().getDay().toString();
  console.log(
    `The app should run tasks every ${dayOfWeekAsString(SCHEDULED_DAY)}.`
  );
  console.log(`Today is ${dayOfWeekAsString(dayOfWeekAsIndex)}.`);
  if (dayOfWeekAsIndex !== SCHEDULED_DAY) {
    console.log(`We are not scheduled to send a form today.`);
    return;
  }
  console.log(`Today is the day to send our forms!`);
  try {
    await mongoose.connect(DB_TYPE === "atlas" ? mongoAtlas : localMongo, {
      // Will use different connection URI depending on env settings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("DB connection successful");
    console.log(`Using ${DB_TYPE} connection`);

    const activeUsers = await UserModel.find({ active: true });
    const allPostRequests = activeUsers.map((user) => {
      // Create the post request to submit the form for each active user.
      return CreatePostRequest(
        ENVIRONMENT === "production" ? "student" : "test",
        user
      ); // If app is not in production, just use test requests
    });
    await callRequestInBatches(allPostRequests, 5); // Post the request in batches of 5
    console.log(`Finished with all tasks!`);
    process.exit();
  } catch (err) {
    console.error(err);
    console.log(`Error while trying to connect to ${DB_TYPE} connection`);
  }
})();
