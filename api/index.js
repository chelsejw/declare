require("dotenv").config();
const ENV = process.env;
const mongoose = require("mongoose");
const localMongo = `mongodb://localhost:27017/${ENV.DB_NAME}`;
const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}`;
let dbType = ENV.DB_TYPE;
const UserController = require(`./controllers/UserController`);
const cron = require("node-cron");
const JobController = require("./controllers/JobController");
const express = require("express");
const app = express();
const port = ENV.PORT || 4000;
const environment = ENV.NODE_ENV;

const cors = require("cors");
/* ===========================
  Express middleware configuration
  ===========================*/
const whiteList =
  environment === "development"
    ? ["https://ga-declaration.herokuapp.com", "http://localhost:3000"]
    : "https://ga-declaration.herokuapp.com";

const corsConfigs = {
  origin: whiteList,
  methods: ["GET", "POST", "PATCH"],
};
app.use(cors(corsConfigs));
app.use(express.json());

/* ===========================
  API routes
  ===========================*/
// app.get("/test", JobController.sendGoogleFormForActiveUsers);
app.get("/scheduled", UserController.getScheduledTime);
app.post("/exists", UserController.checkIfUserExists);
app.post("/register", UserController.register);
app.patch("/update", UserController.updateUser);
app.post("/login", UserController.login);
app.get("*", (_, res) => {
  res.status(404).send(`No such resource was found.`);
});

/* ===========================
  JOBS SCHEDULED
  ===========================*/

/* 
  CRON TIME FORMAT 
  seconds(optional) | min | hour | day (of the month) | month | day (of the week)
  */

cron.schedule("* * * * *", JobController.testJob);
// cron.schedule(ENV.SCHEDULED_TIME_TO_RUN, JobController.sendGoogleFormForActiveUsers); // Runs every hour
cron.schedule(
  ENV.SCHEDULED_TIME_TO_RUN,
  JobController.sendGoogleFormForActiveUsers
); // Runs the task according to timing specified on env file
/* ===========================
  Mongoose + Server connection
  ===========================*/

mongoose
  .connect(dbType === "atlas" ? mongoAtlas : localMongo, {
    // Will use different connection URI depending on env settings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((_) => {
    // DB connected successfully
    console.log("DB connection successful");
    console.log(`Using ${dbType} connection`);

    app.listen(port, () => {
      console.log(`Declare API is running on port: ${port}`);
      console.log(`The environment is currently set to ${environment}`);
    });
  })
  .catch((err) => {
    console.error(err);
    console.log(`Error while trying to connect to ${dbType} connection`);
  });
