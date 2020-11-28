import React from "react";
import { Grid, TextField, Typography } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";

export default function Update({ inputs, handleInputChange }) {
  return (
    <div>
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
      <Grid justify="space-between" container>
        <Grid item xs={10}>
          <Typography>
            Automatically send my all-clear declaration form every Monday.
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Switch
            onChange={(e) => handleInputChange(e)}
            name="active"
            value={inputs.active}
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
