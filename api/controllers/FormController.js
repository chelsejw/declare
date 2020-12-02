const cohortsArray = require('../models/cohorts');

module.exports = {
  getCohorts: (req, res) => {
    res.json(cohortsArray);
  }
}