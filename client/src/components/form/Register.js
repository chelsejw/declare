import React, { useState, useEffect } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Typography } from "@material-ui/core";
import requests from "../../helpers/api";

export default function Register({
  inputs,
  handleInputChange,
  errors,
  renderErrors,
  classes
}) {
  const { getCohortList } = requests;
  const [cohorts, setCohorts] = useState([]);

  let cohortItems = cohorts.map((name) => {
    return <MenuItem value={name}>{name}</MenuItem>;
  });

  useEffect(() => {
    getCohortList()
      .then(({ data }) => {
        setCohorts(data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  const {
    ga_email: GAEmailErrors,
    mobile: mobileErrors,
    full_name: fullNameErrors,
  } = errors;
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        error={GAEmailErrors.length > 0}
        helperText={GAEmailErrors.length > 0 && renderErrors(GAEmailErrors)}
        required
        fullWidth
        id="ga_email"
        label="GA Email Address"
        name="ga_email"
        // autoComplete="email"
        autoFocus
        value={inputs.ga_email}
        onChange={(e) => handleInputChange(e)}
      />
      {/* <TextField
        variant="outlined"
        errors={passwordErrors.length > 0}
        helperText={passwordErrors.length > 0 && renderErrors(passwordErrors)}
        margin="normal"
        required
        fullWidth
        id="password"
        label="Password"
        name="password"
        autoComplete="password"
        autoFocus
        type="password"
        value={inputs.password}
        onChange={(e) => handleInputChange(e)}
      /> */}
      {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="verify_pass"
              label="Verify Password"
              name="verify_pass"
              autoComplete="password"
              autoFocus
              value={inputs.password}
              onChange={(e)=> handleInputChange(e)}
            /> */}
      <TextField
        variant="outlined"
        margin="normal"
        required
        error={mobileErrors.length > 0}
        helperText={mobileErrors.length > 0 && renderErrors(mobileErrors)}
        fullWidth
        id="mobile"
        label="Contact Number"
        name="mobile"
        autoComplete="mobile"
        value={inputs.mobile}
        onChange={(e) => handleInputChange(e)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        error={fullNameErrors.length > 0}
        helperText={fullNameErrors.length > 0 && renderErrors(fullNameErrors)}
        required
        fullWidth
        id="full_name"
        label="Full Name (as in NRIC)"
        name="full_name"
        autoComplete="full_name"
        value={inputs.full_name}
        onChange={(e) => handleInputChange(e)}
      />
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="cohortLabel">
          Cohort Name
        </InputLabel>{" "}
        <Select
          // variant="outlined"
          labelId="cohortLabel"
          id="cohort"
          className={classes.selectEmpty}
          displayEmpty
          fullWidth
          name="cohort"
          // label="cohort name"
          value={inputs.cohort}
          placeholder="Cohort Name"
          onChange={(e) => handleInputChange(e)}
        >


          {cohortItems}
        </Select>
      </FormControl>
    </div>
  );
}
