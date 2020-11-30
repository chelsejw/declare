import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  TextField,
  CssBaseline,
  Avatar,
  Button,
  Box,
} from "@material-ui/core";

import { isEqual } from "lodash";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FormStyle from "./styles/FormStyle";
import Copyright from "./components/Copyright";
import axios from "axios";
import Register from "./components/Register";
import Update from "./components/Update";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ScaleLoader from "react-spinners/ScaleLoader";
const updatedText = "Successfully updated your profile!";

const useStyles = FormStyle;

export default function App() {
  const classes = useStyles();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    ga_email: "",
    full_name: "",
    active: false,
    mobile: "",
  });

  const [stage, setStage] = useState("check email");
  const [message, setMessage] = useState(
    "Enter your email to see if it's in the database."
  );
  const [buttonText, setButtonText] = useState("Check Email");
  const [user, setUser] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [profileChanged, setProfileChanged] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "active") {
      setInputs({ ...inputs, active: !inputs.active });
      return;
    }
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    return;
  };

  const checkIfUserExists = () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/exists", { email: inputs.email })
      .then(({ data }) => {
        setLoading(false);
        const { exists } = data;
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
        setLoading(false);
        setMessage("There was an error. Reload the page and try again.");
        console.error(err, "There was an error");
      });
  };

  const loginUser = () => {
    setLoading(true);

    axios
      .post("http://localhost:4000/login", {
        email: inputs.email,
        password: inputs.password,
      })
      .then(({ data }) => {
        setLoading(false);
        const { error, message: responseMessage, user: userData } = data;
        // console.log(userData, `from login`);
        if (error) {
          setMessage(responseMessage);
        } else {
          setStage("authenticated");
          console.log(`My user data is...`);
          console.log(userData);
          setUser({ ...inputs, ...userData });
          setInputs({ ...inputs, ...userData });
          setMessage(
            `You are authenticated as ${userData.email}. You may update your details below.`
          );
          setButtonText("Update");
        }
      })
      .catch((err) => {
        setLoading(false);
        setMessage("Something went wrong. Reload the page and try again.");

        console.log(err, "There was an error");
      });
  };

  const updateUser = () => {
    const { email, full_name, ga_email, active, mobile } = inputs;
    setLoading(true);
    axios
      .patch("http://localhost:4000/update", {
        email,
        full_name,
        ga_email,
        active,
        mobile,
      })
      .then(({ data }) => {
        const { error, user: userData } = data;
        setProfileChanged(false);
        // console.log(res.data);
        if (!error) {
          setLoading(false);
          setMessage("Your profile was updated successfully.");
          setStage("updated profile");
          setUser({ ...inputs, ...userData });
          setInputs({ ...inputs, ...userData });
          setButtonText(updatedText);
        } else {
          setLoading(false);
          setMessage(
            "Something went wrong while trying to update your user. Reload the page and try again."
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage(
          "Something went wrong while trying to update your user. Reload the page and try again."
        );
      });
  };

  const registerUser = () => {
    setLoading(true);
    axios
      .post("http://localhost:4000/register", inputs)
      .then(({ data }) => {
        setTimeout(setLoading(false), 800);
        const err = data.error;
        console.log(data);
        if (!err) {
          const { user: userData } = data;
          setStage("authenticated");
          setUser({ ...inputs, ...userData });
          setInputs({ ...inputs, ...userData });
          setMessage(
            `You are now registered as ${userData.email}, and are subscribed to the service. You may turn off the service below.`
          );
          setButtonText("Update");
        } else {
          setMessage(data.message);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err, "There was an error");
      });
  };

  // useEffect(() => {
  //   console.log(`Use effect user log`, user);
  // }, [user]);

  useEffect(() => {
    // if (
    //   (stage === "updated profile" || stage === "authenticated") && !profileChanged) {
    //   console.log(`Toggled profile changed`);
    //   setProfileChanged(true);
    //   setButtonText("Update");
    // }
    // console.log(`Inputs`);
    // console.log(inputs);
    // console.log(`User`);
    // console.log(user);
    // console.log(`Stage`);

    // console.log(stage);

    // console.log(`Are user and inputs the same?`, isEqual(inputs, user));

    if (!isEqual(inputs, user)) {
      setButtonText("Update")
      setProfileChanged(true);
      return;
    }
    setProfileChanged(false);
  }, [inputs]);

  // useEffect(() => {
  //   console.log(`profileChange?`, profileChanged);
  // }, [profileChanged]);

  // useEffect(() => {
  //   console.log(`The stage is now ${stage}`);
  // }, [stage]);

  let mainIcon;

  switch (stage) {
    case "authenticated":
      mainIcon = <AccountCircleIcon />;
      break;
    case "updated profile":
      mainIcon = <CheckCircleIcon />;
      break;
    default:
      mainIcon = <LockOutlinedIcon />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={3} md={5} className={classes.image} />
      <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>{mainIcon}</Avatar>
          <Typography component="h1" variant="h5">
            {stage.toUpperCase()}
          </Typography>

          <Typography variant="subtitle2" color="secondary" align="center">
            {" "}
            {message}{" "}
          </Typography>

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

            <Box mt={5}>
              <Welcome />

              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
