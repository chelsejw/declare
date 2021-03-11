import React, { useEffect, useState } from 'react'
import { Paper, Grid, CssBaseline, Box } from '@material-ui/core'
import isEqual from 'lodash.isequal'
import omit from 'lodash.omit'
import AuthHeader from './components/AuthHeader'
import Form from './components/form/Form'
import TemplateStyles from './styles/template'
import Copyright from './components/Copyright'
import Welcome from './components/Welcome'
import requests from './helpers/api'
import formValidator from './helpers/validator'

import {
  CHECK_EMAIL,
  UPDATED,
  AUTHENTICATED,
  LOGIN,
  UPDATED_TEXT,
  REGISTER,
} from './constants'
import defaultStates from './states/defaultStates'

const useStyles = TemplateStyles

export default function App() {
  const classes = useStyles()

  /* ====================================
  STATESSS
  =====================================+*/
  const [inputs, setInputs] = useState(defaultStates.inputs)
  const [stage, setStage] = useState(defaultStates.stage)
  const [message, setMessage] = useState(defaultStates.message)
  const [errors, setErrors] = useState(defaultStates.errors)
  const [buttonText, setButtonText] = useState(defaultStates.buttonText)
  const [user, setUser] = useState(defaultStates.user)
  const [loading, setLoading] = useState(defaultStates.loading)
  const [profileChanged, setProfileChanged] = useState(
    defaultStates.profileChanged,
  )

  /* ====================================
  HELPERS
  =====================================+*/
  const syncInputsAndUserProfile = (updatedData) => {
    setInputs((prev) => ({ ...prev, ...updatedData }))
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  const handleRequestError = (err, errorMessage) => {
    // eslint-disable-next-line
    console.error(err)
    setMessage(errorMessage)
    setLoading(false)
  }

  const responseHandler = (data) => {
    setLoading(false)
    const { error, message: responseMessage } = data

    if (error) {
      setMessage(responseMessage)
      return
    }

    if (stage === CHECK_EMAIL) {
      const { exists } = data
      if (exists) {
        // If user exists, user should login.
        setStage(LOGIN)
        setButtonText('Check Password')
        setMessage('This email is registered. Enter your password')
      } else {
        // If user doesn't exist, user should register.
        setStage(REGISTER)
        setButtonText('Register')
        setMessage(
          'Email does not exist in our database. Register for the service',
        )
      }
      return
    }

    const { user: userData } = data

    if (stage === LOGIN) {
      syncInputsAndUserProfile(userData)
      setStage(AUTHENTICATED)
      setMessage(
        `You are authenticated as ${userData.email}. You may update your details below.`,
      )
      setButtonText('Update')
      return
    }

    if (stage === REGISTER) {
      setStage(AUTHENTICATED)
      syncInputsAndUserProfile(userData)
      setMessage(
        `You are now registered as ${userData.email}, and are subscribed to the service. You may turn off the service below.`,
      )
      setButtonText('Registration successful!')
      setProfileChanged(false)
      return
    }

    if (stage === AUTHENTICATED || stage === UPDATED) {
      setMessage('Your profile was updated successfully.')
      syncInputsAndUserProfile(userData)
      setStage(UPDATED)
      setButtonText(UPDATED_TEXT)
      setProfileChanged(false)
    }
  }

  const handleInputChange = (e) => {
    if (e.target.name === 'active') {
      setInputs({ ...inputs, active: !inputs.active })
      return
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }
  /* ====================================
  ACTIONS
  =====================================+*/
  const checkIfUserExists = () => {
    const form = formValidator('email', inputs)
    setErrors((prev) => ({ ...prev, ...form.errors }))
    if (!form.isValid) return
    setLoading(true)
    const { email } = inputs
    requests
      .checkEmail(email)
      .then(({ data }) => {
        responseHandler(data)
      })
      .catch((err) => {
        handleRequestError(
          err,
          'There was an error. Reload the page and try again.',
        )
      })
  }

  const loginUser = () => {
    const form = formValidator('email, password', inputs)
    setErrors((prev) => ({ ...prev, ...form.errors }))
    if (!form.isValid) return
    setLoading(true)
    const { email, password } = inputs
    requests
      .login(email, password)
      .then(({ data }) => {
        responseHandler(data)
      })
      .catch((err) => {
        handleRequestError(
          err,
          'There was an error. Reload the page and try again.',
        )
      })
  }

  const updateUser = () => {
    const form = formValidator(
      'ga_email, mobile, full_name, cohort, user_type, send_day',
      inputs,
    )
    setErrors((prev) => ({ ...prev, ...form.errors }))
    if (!form.isValid) return
    setLoading(true)
    requests
      .update(inputs)
      .then(({ data }) => {
        responseHandler(data)
      })
      .catch((err) => {
        handleRequestError(
          err,
          `There was an error while trying to update your user. Reload the page and try again.`,
        )
      })
  }

  const registerUser = () => {
    const form = formValidator(
      'ga_email, password, mobile, full_name, cohort, user_type, send_day',
      inputs,
    )
    setErrors((prev) => ({ ...prev, ...form.errors }))
    if (!form.isValid) return
    setLoading(true)
    requests
      .register(inputs)
      .then(({ data }) => {
        responseHandler(data)
      })
      .catch((err) => {
        handleRequestError(
          err,
          'There was an error while trying to register your user. Reload the page and try again.',
        )
      })
  }

  const { getScheduledTime } = requests
  const [loadingScheduledTime, setLoadingScheduledTime] = useState(true)
  const [scheduledTime, setScheduledTime] = useState('')
  useEffect(() => {
    getScheduledTime()
      .then(({ data }) => {
        setScheduledTime(data)
        setLoadingScheduledTime(false)
      })
      .catch((err) => {
        console.error(err)
        setLoadingScheduledTime(false)
        setScheduledTime('Error getting scheduled time from server.')
      })
  }, [])

  /*
  Everytime input is changed, and the user is either authenticated or has updated their profile, check if the inputs differ from their user data.
  If it differs, we consider the profile to have changed. This will enable the update button.
  */
  useEffect(() => {
    if (stage === AUTHENTICATED || stage === UPDATED) {
      const inputsWithoutPassword = omit(inputs, 'password')
      if (!isEqual(inputsWithoutPassword, user)) {
        setButtonText('Update')
        setProfileChanged(true)
        return
      }
      setProfileChanged(false)
    }
  }, [inputs, user, stage])

  /* ====================================
  DEBUGGING
  =====================================+*/

  // useEffect(() => {
  //   console.log(inputs);
  // }, [inputs]);

  // useEffect(() => {
  //   console.log(errors);
  // }, [errors]);

  /* ====================================
  JSX
  =====================================+*/

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={5} className={classes.image} />
      <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <AuthHeader classes={classes} stage={stage} message={message} />
          <Form
            classes={classes}
            stage={stage}
            message={message}
            errors={errors}
            checkIfUserExists={checkIfUserExists}
            registerUser={registerUser}
            loginUser={loginUser}
            loading={loading}
            profileChanged={profileChanged}
            updateUser={updateUser}
            handleInputChange={handleInputChange}
            inputs={inputs}
            user={user}
            buttonText={buttonText}
            scheduledTime={scheduledTime}
            constants={{ AUTHENTICATED, CHECK_EMAIL, UPDATED_TEXT, UPDATED }}
          />

          <Box mt={5}>
            <Welcome
              loadingScheduledTime={loadingScheduledTime}
              scheduledTime={scheduledTime}
            />
            <Copyright />
          </Box>
        </div>
      </Grid>
    </Grid>
  )
}
