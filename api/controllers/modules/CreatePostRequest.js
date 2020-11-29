const qs = require("qs");
const axios = require("axios");

const createPostRequest = (userType, user) => {
  const {email, ga_email, mobile, full_name } = user
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const studentForm = {
    ["entry.1315738832_year"]: currentYear, // Year of submission
    ["entry.1315738832_month"]: currentMonth, // Month of submission
    ["entry.1315738832_day"]: currentDay, // Day of submission
    ["entry.2139343058"]: "SEIF 3", // Cohort Name (e.g. SEIF 3, DSI 18)
    ["entry.350879435"]: full_name, // Name as per NRIC
    ["entry.1443611571"]: mobile, // Contact Number
    ["entry.88756219"]: ga_email, // Email used to sign with GA
    ["emailAddress"]: email, // Email
    ["entry.1464206896"]: "No",
    ["entry.748573793"]: "No",
    ["entry.1351260288"]: "None of the Above",
    ["entry.1840918119"]: "No",
    ["entry.472021917"]: "No",
    ["entry.1296804660"]: "None of the above",
    ["entry.1655462793"]: "No",
    ["entry.941208881"]: "Yes, I understand.",
    ["entry.330888046"]: "Yes, I understand.",
  };

  const testForm = {
    ["entry.218682909"]: full_name,
    ["entry.376316146_year"]: currentYear,
    ["entry.376316146_month"]: currentMonth,
    ["entry.376316146_day"]: currentDay,
    ["entry.1944830854"]: "Yes",
    ["emailAddress"]: email,
  };

  let formData, postEndpoint;

  if (userType === "test") {
    formData = qs.stringify(testForm);
    postEndpoint = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdG6OmYlhYEqLjFH33nV4t14-C-mi01xQrvAjEDNWHysAeJRA/formResponse`;
  } else {
    formData = qs.stringify(studentForm);
    postEndpoint = `https://docs.google.com/forms/u/2/d/e/1FAIpQLSfviLd5-9633aKQBAeVIS58rr0WCEO8irhjLYFHYgGBsN49iQ/formResponse`;
  }
  return axios
  .post(postEndpoint, formData)
    .then(_ => {
      user.last_declared = date;
      user.save()
    })
    .catch((err) => console.log(err));
}

module.exports = createPostRequest;
