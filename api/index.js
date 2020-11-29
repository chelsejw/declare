require("dotenv").config();
const ENV = process.env;
const mongoose = require("mongoose");
const localMongo = `mongodb://localhost:27017/${ENV.DB_NAME}`;
const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}`;
let dbType = ENV.DB_TYPE
const UserController = require(`./controllers/UserController`);
const cron = require("node-cron");
const JobController = require("./controllers/JobController");
const express = require("express");
const app = express();
const port = 4000;

(() => {
  const cors = require("cors");
  /* ===========================
  Express middleware configuration
  ===========================*/

  app.use(cors());
  app.use(express.json());

  /* ===========================
  API routes
  ===========================*/

  app.post("/exists", UserController.validateRegisteredUser);
  app.post("/register", UserController.register);
  app.patch("/update", UserController.updateUser);
  app.post("/login", UserController.login);
  app.get("*", (_, res) => {
    res.status(404).send(`No such resource was found.`);
  });

  /* ===========================
  JOBS SCHEDULED
  ===========================*/

  cron.schedule("* * * * *", JobController.testJob);

  /* ===========================
  Mongoose + Server connection
  ===========================*/

  mongoose
    .connect(dbType==="atlas" ? mongoAtlas : localMongo, {
      // Will use different connection URI depending on env settings
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
    .then((_) => {
      // DB connected successfully
      console.log("DB connection successful");
      console.log(`Using ${dbType} connection`);

      app.listen(process.env.PORT || port, () => {
        console.log(`Declare app listening on port: ${port}`);
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(
        `Error while trying to connect to ${
          usingLocalDB ? "local" : "atlas"
        } connection`
      );
    });
})();
