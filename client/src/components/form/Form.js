import React from 'react';
import {
  Grid,
  TextField,
  Button,
} from "@material-ui/core";
import Register from "./Register";
import Update from "./Update";
import Login from "./Login";
import ScaleLoader from "react-spinners/ScaleLoader";
import {CHECK_EMAIL, UPDATED, AUTHENTICATED, LOGIN, REGISTER} from '../../constants'

export default function Form ({classes, stage, inputs, handleInputChange, updateUser, loading, profileChanged, loginUser, user, checkIfUserExists, registerUser, buttonText}) {
  return (
    <form className={classes.form} noValidate>
      {
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            disabled={stage !== CHECK_EMAIL ? true : false}
            autoComplete="email"
            autoFocus
            value={inputs.email}
            onChange={(e) => handleInputChange(e)}
          />
      }

      {stage === LOGIN && (
        <Login
          inputs={inputs}
          handleInputChange={(e) => handleInputChange(e)}
        />
      )}

      {stage === REGISTER && (
        <Register
          inputs={inputs}
          handleInputChange={(e) => handleInputChange(e)}
        />
      )}

      {(stage === AUTHENTICATED || stage === UPDATED) && (
        <Update
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
          ((stage === UPDATED || stage === AUTHENTICATED) &&
            !profileChanged)
        } // If loading is true, no other requests should be sent.
        onClick={(e) => {
          e.preventDefault();
          switch (stage) {
            case CHECK_EMAIL:
              checkIfUserExists();
              break;
            case LOGIN:
              loginUser();
              break;
            case REGISTER:
              registerUser();
              break;
            case AUTHENTICATED:
            case UPDATED:
              updateUser();
              break;
            default:
              return;
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
  );
  
}