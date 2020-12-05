const express = require('express')
const router = express.Router()
const UserController = require(`../controllers/UserController`)
const { getCohorts } = require(`../controllers/FormController`)

router.get('/cohorts', getCohorts)
router.get('/scheduled', UserController.getScheduledTime)
router.post('/exists', UserController.checkIfUserExists)
router.post('/register', UserController.register)
router.patch('/update', UserController.updateUser)
router.post('/login', UserController.login)
router.get('*', (_, res) => {
  res.status(404).send(`No such resource was found.`)
})

module.exports = router
