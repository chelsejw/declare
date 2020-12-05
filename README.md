# Declare

An app to automatically send the GA declaration form every week at a specified time, for the subscribed users.

## Notable Technologies: Backend
- Express
- Heroku with Scheduler Add-on (runs `api/jobs/sendGoogleForm.js` every day)

## Notable Technologies: Frontend
- React
- Material UI

## Setup Instructions

Depending on your package manager, install the required depencies in both apps. I used `Yarn` in development.

Do `yarn install` OR `npm i` from both `/client` and `/api` folders to install the necessary dependencies.

Create a `.env` in `/api` to set up the app, following `.env.example`. 

To start either app, do `npm start` or `yarn start` from their respective root folders.

## Goals 

✅  Setup frontend for basic authentication & CRUD (without sessions/cookies/JWT)

✅  Setup backend for CRUD (is delete necessary?)

✅  Setup backend to send forms periodically

✅   Validation for frontend input

✅   Users can choose cohort name

❗️  Allow users to configure the fields to send out

✅  Add compatibility for Team declaration forms

❗️  Notify user via email for every declaration submitted? (Users should be able to turn on/off the feature. Or they can enable emails only when the service fails.) 


