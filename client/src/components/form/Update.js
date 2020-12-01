import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import moment from 'moment';
export default function LastDeclared({ inputs, handleInputChange, lastDeclared }) {
  return (
    <div>
      <Box my={2}>
        <Grid justify="space-between" container alignItems="center">
          <Grid item xs={11}>
            <Typography variant="subtitle1" align="right">
            Automatically send my all-clear declaration form.
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
