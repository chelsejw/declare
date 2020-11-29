const cron = require('node-cron');
const JobController = require('./controllers/JobController')


cron.schedule("* * * * *", JobController.testJob);

module.exports = cron; 
