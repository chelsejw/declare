# Declare

An app to automatically send the GA declaration form every week at a specified time, for the subscribed users.

## Notable Technologies: Backend
- Express
- Cron (node-cron): for scheduling tasks to run

## Notable Technologies: Frontend
- React
- Material UI

## Setup Instructions

Depending on your package manager, install the required depencies in both apps. I used `Yarn` in development.

Do `yarn install` OR `npm i` from both `/client` and `/api` folders to install the necessary dependencies.

Create a `.env` in `/api` for the MongoDB connection, following `.env.example`. 

To start either app, do `npm start` or `yarn start` from their respective root folders.

## Goals 

✅  Setup frontend for basic authentication & CRUD (without sessions/cookies/JWT)

✅  Setup backend for CRUD (is delete necessary?)

✅  Setup backend to send forms periodically

❗️  Validation for frontend input

❗️  Notify user via email for every declaration submitted? (Users should be able to turn on/off the feature. Or they can enable emails only when the service fails.) 


