import React from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import ScaleLoader from 'react-spinners/ScaleLoader'

import Register from './Register'
import ActiveSwitch from './ActiveSwitch'
import Login from './Login'
import {
  CHECK_EMAIL,
  UPDATED,
  AUTHENTICATED,
  LOGIN,
  REGISTER,
} from '../../constants'

export default function Form({
  errors,
  classes,
  stage,
  inputs,
  handleInputChange,
  updateUser,
  loading,
  profileChanged,
  loginUser,
  user,
  checkIfUserExists,
  registerUser,
  buttonText,
  scheduledTime,
}) {
  const renderErrors = (arrayOfMessages) => {
    return arrayOfMessages.map((msg, index) => {
      return (
        <span key={index}>
          {'*'} {msg}{' '}
        </span>
      )
    })
  }
  const { email: emailErrors } = errors

  return (
    <form className={classes.form} noValidate>
      {
        <TextField
          error={emailErrors.length > 0}
          helperText={emailErrors.length > 0 && renderErrors(emailErrors)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          disabled={stage !== CHECK_EMAIL}
          autoComplete="email"
          autoFocus
          value={inputs.email}
          onChange={(e) => handleInputChange(e)}
        />
      }

      {(stage === LOGIN || stage === REGISTER) && (
        <Login
          inputs={inputs}
          errors={errors}
          handleInputChange={(e) => handleInputChange(e)}
          renderErrors={renderErrors}
        />
      )}

      {(stage === REGISTER || stage === AUTHENTICATED || stage === UPDATED) && (
        <Register
          errors={errors}
          inputs={inputs}
          classes={classes}
          renderErrors={renderErrors}
          handleInputChange={(e) => handleInputChange(e)}
          scheduledTime={scheduledTime}
        />
      )}

      {(stage === AUTHENTICATED || stage === UPDATED) && (
        <ActiveSwitch
          inputs={inputs}
          lastDeclared={user.last_declared}
          handleInputChange={(e) => handleInputChange(e)}
        />
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        disabled={
          loading ||
          ((stage === UPDATED || stage === AUTHENTICATED) && !profileChanged)
        } // If loading is true, no other requests should be sent.
        onClick={(e) => {
          e.preventDefault()
          switch (stage) {
            case CHECK_EMAIL:
              checkIfUserExists()
              break
            case LOGIN:
              loginUser()
              break
            case REGISTER:
              registerUser()
              break
            case AUTHENTICATED:
            case UPDATED:
              updateUser()
              break
            default:
          }
        }}
      >
        {loading ? (
          <Grid item>
            <ScaleLoader size={20} loading={loading} />
          </Grid>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  )
}
