import React from "react";
import { Grid, TextField, Typography, Box } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import moment from 'moment';
export default function Update({ inputs, handleInputChange, lastDeclared }) {
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="full_name"
        label="Full Name"
        name="full_name"
        autoComplete="full_name"
        autoFocus
        value={inputs.full_name}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="ga_email"
        label="GA Email Address"
        name="ga_email"
        autoComplete="email"
        autoFocus
        value={inputs.ga_email}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="mobile"
        label="Contact Number"
        name="mobile"
        autoComplete="mobile"
        autoFocus
        value={inputs.mobile}
        onChange={(e) => handleInputChange(e)}
      />
      <Box my={2}>
        <Grid justify="space-between" container>
          <Grid item xs={11}>
            <Typography variant="h6">
              Automatically send my all-clear declaration form every Monday.
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Switch
              onChange={(e) => handleInputChange(e)}
              name="active"
              checked={inputs.active ? true : false}
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Typography variant="overline" display="block">
        Last declared: {lastDeclared ? <Typography variant="overline" display="inline" color="primary">{moment(lastDeclared).format("dddd, DD MMM YYYY, hh:mm:ss a")}</Typography> : "Never"}
      </Typography>
    </div>
  );
}
