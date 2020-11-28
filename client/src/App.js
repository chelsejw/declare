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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormStyle from "./styles/FormStyle";
import Copyright from "./components/Copyright";
import axios from "axios";
import Register from "./components/Register";
import Update from "./components/Update";
import Login from "./components/Login";

const useStyles = FormStyle;

export default function App() {
  const classes = useStyles();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    ga_email: "",
    full_name: "",
    active: false,
  });

  const [stage, setStage] = useState("check email");
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

  const checkUserRegistration = () => {
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

  const loginUser = () => {
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
          setInputs(userData);
          setMessage(`You are authenticated, and may update your details.`);

          setButtonText("Update");
        }
      })
      .catch((err) => {
        console.log(err, "There was an error");
      });
  };

  const updateUser = () => {
    const { email, full_name, ga_email, active } = inputs;
    axios
      .patch("http://localhost:4000/update", {
        email,
        full_name,
        ga_email,
        active,
      })
      .then((res) => {
        const { error, message: responseMessage, user: userData } = res.data;
        console.log(res.data)
        setMessage(responseMessage);
        if (!error) {
          setStage("updated profile");
          setInputs({...inputs, ...userData});
        }
      })
      .catch((err) => {
        console.log(err);
        setMessage(err);
      });
  };

  const registerUser = () => {
    axios
      .post("http://localhost:4000/register", inputs)
      .then((res) => {
        const err = res.data.error;
        console.log(res.data);
        if (!err) {
          setStage("authenticated");
          const { email, full_name } = res.data.user;
          setUser({ ...user, email, full_name });
          setMessage(`You are now registered as ${email}, and may update your details.`);
          setButtonText("Update");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err, "There was an error");
      });
  };

  useEffect(() => {
    console.log(`Use effect inputs log`, inputs);
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
            {
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                disabled = {stage!=="check email" ? true : false}
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

            {(stage === "authenticated" || stage==="updated profile") && (
              <Update
                inputs={inputs}
                handleInputChange={(e) => handleInputChange(e)}
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();

                switch (stage) {
                  case "check email":
                    checkUserRegistration();
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
