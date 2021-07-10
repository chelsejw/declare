require('dotenv').config()
const mongoose = require('mongoose')
const router = require('./routes')
const express = require('express')
const cors = require('cors')

const {
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  DB_TYPE,
  PORT,
  NODE_ENV,
} = process.env
const DEVELOPMENT_ENV = 'development'
const MONGO_ATLAS = 'atlas'

const port = PORT || 4000
const LOCAL_MONGO_URI = `mongodb://localhost:27017/${DB_NAME}`
const MONGO_ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`
const app = express()

/* ===========================
  Express middleware configuration
  ===========================*/
const WHITE_LIST =
  NODE_ENV === DEVELOPMENT_ENV
    ? ['https://ga-declaration.herokuapp.com', 'http://localhost:3000']
    : 'https://ga-declaration.herokuapp.com'

const CORS_CONFIG = {
  origin: WHITE_LIST,
  methods: ['GET', 'POST', 'PATCH'],
}
app.use(cors(CORS_CONFIG))
app.use(express.json())

/* ===========================
  API routes
  ===========================*/
// app.get("/test", JobController.sendGoogleFormForActiveUsers);
app.use('/', router)

/* ===========================
  JOBS SCHEDULED
  ===========================*/

/*
  CRON TIME FORMAT
  seconds(optional) | min | hour | day (of the month) | month | day (of the week)
  */

// cron.schedule("* * * * *", JobController.testJob);
// // cron.schedule(ENV.SCHEDULED_TIME_TO_RUN, JobController.sendGoogleFormForActiveUsers); // Runs every hour
// cron.schedule(
//   ENV.SCHEDULED_TIME_TO_RUN,
//   JobController.sendGoogleFormForActiveUsers
// ); // Runs the task according to timing specified on env file
/* ===========================
  Mongoose + Server connection
  ===========================*/

mongoose
  .connect(DB_TYPE === MONGO_ATLAS ? MONGO_ATLAS_URI : LOCAL_MONGO_URI, {
    // Will use different connection URI depending on env settings
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((_) => {
    // DB connected successfully
    console.log('DB connection successful')
    console.log(`Using ${DB_TYPE} connection`)

    app.listen(port, () => {
      console.log(`Declare API is running on port: ${port}`)
      console.log(`The environment is currently set to ${NODE_ENV}`)
    })
  })
  .catch((err) => {
    console.error(err)
    console.log(`Error while trying to connect to ${DB_TYPE} connection`)
  })
