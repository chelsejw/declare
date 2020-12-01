import React from "react";

import { Typography, Link } from "@material-ui/core";
export default function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="primary" href="https://github.com/chelsejw">
        Chelsea E.
      </Link>{" "}
      {new Date().getFullYear()}
      {". | "} Contribute to the project on {" "}
      <Link color="primary" href="https://github.com/chelsejw/declare">
        Github
      </Link>
    </Typography>
  );
}
