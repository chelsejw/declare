require("dotenv").config();
const ENV = process.env;
const mongoose = require("mongoose");
const localMongo = `mongodb://localhost:27017/${ENV.DB_NAME}`;
const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}`;
let usingLocalDB = ENV.IS_LOCAL_DB === "true" ? true : false;
const UserController = require(`./controllers/UserController`);

const express = require("express");
const app = express();
const port = 4000;

(() => {
  const cors = require("cors");

  app.use(cors());
  app.use(express.json());
  app.post("/exists", UserController.validateRegisteredUser);
  app.post("/register", UserController.register);
  app.post("/login", UserController.login);

  app.get("/", (_, res) => {
    res.send("hel");
  });

  mongoose
    .connect(usingLocalDB ? localMongo : mongoAtlas, { // Will use different connection URI depending on env settings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((_) => {
      // DB connected successfully
      console.log("DB connection successful");
      console.log(`Using ${usingLocalDB ? "local" : "atlas"} connection`);

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
