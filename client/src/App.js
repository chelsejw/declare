import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  TextField,
  CssBaseline,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormStyle from "./styles/FormStyle";
import Copyright from "./components/Copyright";
import axios from "axios";
import Register from "./components/Register";
import Update from "./components/Update";

const useStyles = FormStyle;

export default function App() {
  const classes = useStyles();

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const [stage, setStage] = useState("check-email");
  const [message, setMessage] = useState(
    "Enter your email to see if it's in the database."
  );
  const [buttonText, setButtonText] = useState("Check Email");
  const [user, setUser] = useState({ email: "" });

  const handleInputChange = (e) => {
    if (e.target.name === "active") {
      setInputs({ ...inputs, [e.target.name]: e.target.checked });
      return;
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    return;
  };

  useEffect(() => {
    console.log(`The stage is now ${stage}`);
  }, [stage]);

  const checkUserRegistration = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/exists", { email: inputs.email })
      .then((res) => {
        const exists = res.data.exists;
        if (exists) {
          setStage("login");
          setButtonText("Check Password");
          setMessage("This email is registered. Enter your password");
        } else {
          setStage("register");
          setButtonText("Register");
          setMessage(
            "Email does not exist in our database. Register for the service"
          );
        }
      })
      .catch((err) => {
        console.log(err, "There was an error");
      });
  };

  const loginUser = (e) => {
    console.log(`In login`);
    axios
      .post("http://localhost:4000/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then((res) => {
        const { error, message: responseMessage, user: userData } = res.data;
        if (error) {
          setMessage(responseMessage);
        } else {
          setStage("authenticated");
          const { email, full_name } = userData;
          setUser({ ...user, email, full_name });
          setMessage(`You are logged in as ${email}, and may update your details.`);

          setButtonText("Update");
        }
      })
      .catch((err) => {
        console.log(err, "There was an error");
      });
  };

  const registerUser = (e) => {
    axios
      .post("http://localhost:4000/register", inputs)
      .then((res) => {
        const err = res.data.error;
        if (!err) {
          setStage("authenticated");
          const { email, full_name } = res.data;
          setUser({ ...user, email, full_name });
          setMessage(`You are now registered as. ${user.email}`);
          setButtonText("Update");
        }
      })
      .catch((err) => {
        console.log(err, "There was an error");
      });
  };

  useEffect(() => {
    console.log(inputs);
  }, [inputs]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={5} className={classes.image} />
      <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {stage.toUpperCase()}
          </Typography>

          {message}

          <form className={classes.form} noValidate>
            {stage !== "authenticated" && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={inputs.email}
                onChange={(e) => handleInputChange(e)}
              />
            )}

            {stage === "login" && (
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
            )}

            {stage === "register" && (
              <Register
                inputs={inputs}
                handleInputChange={(e) => handleInputChange(e)}
              />
            )}

            {stage === "authenticated" && (
              <Update
                inputs={inputs}
                handleInputChange={(e) => handleInputChange(e)}
              />
            )}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();

                switch (stage) {
                  case "check-email":
                    checkUserRegistration(e);
                    break;
                  case "login":
                    loginUser(e);
                    break;
                  case "register":
                    registerUser(e);
                    break;

                  default:
                }
              }}
            >
              {buttonText}
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
