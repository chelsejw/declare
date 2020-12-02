require("dotenv").config();
const ENV = process.env;
const mongoose = require("mongoose");
const localMongo = `mongodb://localhost:27017/${ENV.DB_NAME}`;
const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}`;
let DB_TYPE = ENV.DB_TYPE;

const connectToDBAndRun = async (callback) => {
  try {
    await mongoose.connect(DB_TYPE === "atlas" ? mongoAtlas : localMongo, {
      // Will use different connection URI depending on env settings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    });
    console.log("DB connection successful");
    console.log(`Using ${DB_TYPE} connection`);
    await callback();
    console.log(`Finished with all tasks!`);
    process.exit();
  } catch (err) {
    console.error(err);
    console.log(`Error while trying to connect to ${DB_TYPE} connection`);
    process.exit();
  }
};

module.exports = connectToDBAndRun;
