require('dotenv').config();
const ENV = process.env
const mongoose = require('mongoose')

const mongoAtlas = `mongodb+srv://${ENV.DB_USER}:${ENV.DB_PASS}@${ENV.DB_HOST}/${ENV.DB_NAME}?retryWrites=true&w=majority`
const UserController = require(`./controllers/UserController`)

const express = require('express');
const app = express();
const port = 4000;

(()=> {
  const cors = require('cors')

  app.use(cors())
  app.use(express.json());
  app.post('/exists', UserController.validateRegisteredUser);
  app.post('/register', UserController.register);
  app.post('/login', UserController.login);

  app.get('/', (_, res) => {
    res.send('hel')
  })


  mongoose.connect(mongoAtlas, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(_ => {
      // DB connected successfully
      console.log('DB connection successful')

      app.listen(process.env.PORT || port, () => {
        console.log(`Declare app listening on port: ${port}`)
      })
    })
    .catch(err => {
      console.log(err)
    })
})();

