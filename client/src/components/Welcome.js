import React from "react";

import { Typography, Box } from "@material-ui/core";
export default function Welcome() {
  return (
    <div>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          This app was built to help our students (and TAs) focus on what
          matters the most – not weekly declaration forms. Subscribed users will
          have their all-clear declaration forms sent out every Monday at 3pm.
          Users can choose to deactivate the service as they wish. Please
          exercise responsibility and turn off the service when circumstances
          involving your health change.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          Having problems with the app? You can reach me on slack (Chelsea E.)
          or email (chelsejw@gmail.com)
        </Typography>
      </Box>
    </div>
  );
}
