import React from "react";

import { Typography, Box, Link } from "@material-ui/core";
export default function Welcome() {
  return (
    <div>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          This app was built to help our students (and TAs) focus on what
          matters the most – not weekly declaration forms. Subscribed users will
          have their all-clear declaration forms sent out every Monday at 3pm.
          Users can choose to deactivate the service as they wish. Please
          use this app responsibly, and turn off the service when circumstances
          involving your health/possible exposure to COVID-19 change.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          You can contribute to this application on{" "}
          <Link color="textPrimary" href="https://github.com/chelsejw/declare">
            Github
          </Link>
          .
        </Typography>
      </Box>
    </div>
  );
}
