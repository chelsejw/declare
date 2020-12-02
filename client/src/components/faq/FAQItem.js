import React from 'react'
import { Typography, Box } from "@material-ui/core";

const FAQItem = (props) => {
  return (
    <Box mb={2}>
      <Typography variant="body2" color="primary">
        {props.question}
      </Typography>
      <Typography variant="body2" color="textPrimary">
        {props.answer}
      </Typography>
    </Box>
  );
}

export default FAQItem;