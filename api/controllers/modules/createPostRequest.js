const qs = require("qs");
const axios = require("axios");

const createPostRequest = (userType, user) => {
  const { email, ga_email, mobile, full_name, cohort } = user;
  const date = new Date();
  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const studentForm = {
    ["entry.1315738832_year"]: currentYear, // Today's Date - Year
    ["entry.1315738832_month"]: currentMonth, // Today's Date - Month
    ["entry.1315738832_day"]: currentDay, // Today's Date - Day
    ["entry.2139343058"]: cohort, // Cohort Class (e.g. SEIF 3, DSI 18)
    ["entry.350879435"]: full_name, // Your name (as per in NRIC) *
    ["entry.1443611571"]: mobile, // Contact Number
    ["entry.88756219"]: ga_email, // Your Email Address (the one you used to register for the GA course) *
    ["emailAddress"]: email, // Email

    ["entry.1464206896"]: "No", // Have you traveled outside of Singapore within the last 14 days?

    ["entry.748573793"]: "No", // Do you have any travel plans between now to 31 Dec 2020?

    ["entry.1351260288"]: "None of the Above", // Are you currently serving any Quarantine Order (QO), Leave of Absence (LOA), or Stay-Home Notice (SHN)? *
    ["entry.1840918119"]: "No", // 4. Are you feeling unwell or experiencing any flu-like symptoms (i.e. fever, cough, runny nose, sore throat, shortness of breath, change of taste/smell, etc.)? *

    ["entry.472021917"]: "No", // 5. Within the last 14 days, have you come in close contact with (i) is a confirmed COVID-19 case; (ii) is part of a COVID-19 cluster; or (iii) someone issued Quarantine Order/Leave of Absence/ Stay-Home Notice? *

    // ["entry.1296804660"]: "None of the above", // If you answer "Yes" to the above question, please specify which contact: (OPTIONAL FIELD)

    ["entry.1655462793"]: "No", // 6. Have you had contact with a member of the household who is unwell i.e. experiencing any flu-like symptoms (i.e. fever, cough, runny nose, sore throat, shortness of breath, change of taste/smell, etc.)? *

    ["entry.941208881"]: "Yes, I understand.", // By submitting this form, I understand that I will need to complete this declaration form every week or when the information I've submitted needs to be updated earlier than the following week. Please check your email on which day of the week your cohort needs to fill out this form. *

    ["entry.330888046"]: "Yes, I understand.", // By submitting this form, I declared the above information is accurate. Please note that in the event we are requested by the Ministry of Health for any contact tracing information, we will be sharing this data with the Ministry of Health. *
  };

  // const oldTestForm = {
  //   ["entry.218682909"]: full_name,
  //   ["entry.376316146_year"]: currentYear,
  //   ["entry.376316146_month"]: currentMonth,
  //   ["entry.376316146_day"]: currentDay,
  //   ["entry.1944830854"]: "Yes",
  //   ["emailAddress"]: email,
  // };

  // const oldTestRequestUrl = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSdG6OmYlhYEqLjFH33nV4t14-C-mi01xQrvAjEDNWHysAeJRA/https://docs.google.com/forms/u/0/d/e/1FAIpQLSdG6OmYlhYEqLjFH33nV4t14-C-mi01xQrvAjEDNWHysAeJRA/formResponseformResponse`

  const testForm = {
    ["entry.920081963"]: full_name,
    ["entry.729846715"]: mobile,
    ["entry.819171092"]: email,
    ["entry.1172513648"]: ga_email,
    ["entry.914351031_year"]: currentYear,
    ["entry.914351031_month"]: currentMonth,
    ["entry.914351031_day"]: currentDay,
  };



  let formData, postEndpoint;

  if (userType === "test") {
    formData = qs.stringify(testForm);
    postEndpoint = `https://docs.google.com/forms/u/0/d/e/1FAIpQLSeFUYvoZykDfxUPPsmEWgfJWa9WLXgcZ356xFs5ZoFwGsj7ng/formResponse`;
  } else {
    formData = qs.stringify(studentForm);
    postEndpoint = `https://docs.google.com/forms/u/2/d/e/1FAIpQLSfviLd5-9633aKQBAeVIS58rr0WCEO8irhjLYFHYgGBsN49iQ/formResponse`;
  }
  return axios
    .post(postEndpoint, formData)
    .then((_) => {
      // Upon succesful submission, update user's last declared field.
      user.last_declared = date;
      user.save();
    })
    .catch((err) => console.error(err));
};

module.exports = createPostRequest;
