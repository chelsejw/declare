const cohortsArray = require('../models/cohorts')

module.exports = {
  getCohorts: (_, res) => {
    res.json(cohortsArray)
  },
}
