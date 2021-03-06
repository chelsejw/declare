import React from 'react'
import { Typography, Box, Link, CircularProgress } from '@material-ui/core'

export default function Welcome({ loadingScheduledTime, scheduledTime }) {
  return (
    <div>
      <Box mb={2}>
        <Typography variant="body1" color="textSecondary" align="center">
          This app was built to help our students focus on what matters the most
          – not weekly declaration forms. Subscribed users will have their
          <Typography
            variant="body1"
            component={'span'}
            display="inline"
            color="textPrimary"
          >
            {' '}
            all-clear declaration forms{' '}
          </Typography>
          sent out at the specified time. Users can choose to deactivate the
          service as they wish. Please use this app responsibly, and turn off
          the service when circumstances involving your health/possible exposure
          to COVID-19 change.
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography
          variant="body1"
          component={'div'}
          color="textSecondary"
          align="center"
        >
          The app is currently set to send out declarations every:{' '}
          {loadingScheduledTime ? (
            <CircularProgress color="secondary" hidden={loadingScheduledTime} />
          ) : (
            <Typography
              variant="body1"
              component={'span'}
              display="inline"
              color="textPrimary"
            >
              {scheduledTime}
            </Typography>
          )}
        </Typography>
      </Box>

      <Box mb={2}>
        <Typography variant="body2" color="textSecondary" align="center">
          If you have any feedback, unaddressed issues or errors, do Slack me
          the details (
          <Link
            color="primary"
            href="https://ga-students.slack.com/team/UTK6D0FF1"
          >
            @Chelsea E.
          </Link>
          ).
        </Typography>
      </Box>
    </div>
  )
}
