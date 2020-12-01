import React from "react";
import { TextField } from "@material-ui/core";

export default function Register({ inputs, handleInputChange, errors, renderErrors }) {
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
        autoFocus
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
        autoFocus
        value={inputs.full_name}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
}
