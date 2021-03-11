# Declare

An app to automatically send the GA declaration form every week at a specified time, for the subscribed users.

## ⭐️ NEW! Features (V1.1) 11 March, 2021 

- Allow user to configure the day they want their all-clear forms sent.

## Features (V1.0)

- Students and GA team can send all-clear declaration forms every week.

## Features in Consideration
- Allow users to customise form fields (so these will be forms that are not all-clear)
- Notify user via email for every declaration submitted? (Users should be able to turn on/off the feature. Or they can enable emails only when the service fails.)

---

## For Developers:

## Notable Technologies: Backend

- Express
- Heroku with Scheduler Add-on (runs `api/jobs/sendGoogleForm.js` every day. Due to Heroku scheduler restrictions which won't let me run jobs for a particular day of a week, this job runs everyday, but the script checks for the current date to see if it should run the job.)

## Notable Technologies: Frontend

- React
- Material UI

## Setup Instructions

This repository has two separate apps - a React `client` and an Express `api`.

### STEP 1: Set the Environment Variables

Create a `.env` in `/api` following `.env.example`. Be sure to remove all comments.

#### FOR API

- `DB_USER`: Your Mongo Atlas username (_you don't need this if using your localhost MongoDB_)
- `DB_PASS`: Your Mongo Atlas password (_you don't need this if using your localhost MongoDB_)
- `DB_HOST`= Your Mongo Atlas host. (_you don't need this if using your localhost MongoDB_)

- `DB_NAME`: Name of your database
- `DB_TYPE`: If this is not set to a string _"atlas"_, it will default to using your localhost DB.
- `SCHEDULED_DAY` This will affect the declaration day showed on the client. Should be a number from 0 - 6. (0 being Sunday, 6 being Saturday.)
- `SCHEDULED_TIME_IN_HOURS`: This will affect the declaration time showed on the client. Should be a number from 0 - 23
- `NODE_ENV` _this should be either "production" or "development"_

#### FOR CLIENT

Create a `.env` in `/client` following `.env.example`.

- `REACT_APP_API_URL`: The API endpoint the client will interact with. The default should be

```
REACT_APP_API_URL=http://localhost:4000
```

### STEP 3: Start the apps

For `api` you can use `yarn dev` if you have `nodemon` installed, if not `yarn start`

For client, just `yarn start`


## Known Issues

❗️ Sometimes, user's last declared field does not update although forms were sent – my theory is that it's an async problem where the connection to the database closed before Mongoose completed saving the changes to the user model. Tried to resolve it with async/await.

❗️ Requests for the *team* form has stopped working. Unable to figure out the issue.
