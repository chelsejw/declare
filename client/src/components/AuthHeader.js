import React from "react";
import {Typography, Avatar, Grid} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function AuthHeader({classes, stage, message}){
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
    <>
          <Avatar className={classes.avatar}>{mainIcon}</Avatar>
          <Typography component="h1" variant="h5">
            {stage.toUpperCase()}
          </Typography>

          <Typography variant="subtitle2" color="secondary" align="center">
            {" "}
            {message}{" "}
          </Typography>
    </>
  )
}