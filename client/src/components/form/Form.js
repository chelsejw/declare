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
            disabled={stage !== "check email" ? true : false}
            autoComplete="email"
            autoFocus
            value={inputs.email}
            onChange={(e) => handleInputChange(e)}
          />
      }

      {stage === "login" && (
        <Login
          inputs={inputs}
          handleInputChange={(e) => handleInputChange(e)}
        />
      )}

      {stage === "register" && (
        <Register
          inputs={inputs}
          handleInputChange={(e) => handleInputChange(e)}
        />
      )}

      {(stage === "authenticated" || stage === "updated profile") && (
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
          ((stage === "updated profile" || stage === "authenticated") &&
            !profileChanged)
        } // If loading is true, no other requests should be sent.
        onClick={(e) => {
          e.preventDefault();
          switch (stage) {
            case "check email":
              checkIfUserExists();
              break;
            case "login":
              loginUser();
              break;
            case "register":
              registerUser();
              break;
            case "authenticated":
            case "updated profile":
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